/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var PlayMusic = require('./PlayMusic');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ListView,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  searchBarInput: {
    marginTop: 30,
    padding: 5,
    fontSize: 15,
    height: 30,
    backgroundColor: '#EAEAEA',
  },
  row: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 5,
  },
  cellBorder: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1,
    marginLeft: 4,
  },
  profpic: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  textcontainer: {
    paddingLeft: 10,
  },
  blanktext: {
    paddingTop: 40,
    fontSize: 20,
    textAlign: 'center',
  }
});

var BASE_URL = 'http://music.163.com/api/search/suggest/web?csrf_token=';

var MusicPlayer = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  },

  onSearchChange: function (event) {
    function status(response) {
      if (response.status >= 200 && response.status < 300) {
        return response;
      }
      throw new Error(response.statusText);
    }

    var searchTerm = encodeURIComponent(event.nativeEvent.text.toLowerCase());
    fetch(BASE_URL, {
      method: 'post',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': 'http://music.163.com/search/',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.81 Safari/537.36',
      },
      body: 's=' + searchTerm + '&limit=20&type=1\n'
    })
      .then(status)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.result && responseData.result.songs) {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.result.songs),
          });
        }
      }).done();
  },

  render: function() {
    var content;
    if (this.state.dataSource.getRowCount() === 0) {
      content = (<Text style={styles.blanktext}>输入搜索值，查看结果2</Text>);
    } else {
      content = (<ListView
        ref="listview"
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        automaticallyAdjustContentInsets={false}
        keyboardDismissMode="onDrag"
        keyboardShouldPersistTaps={true}
        showsVerticalScrollIndicator={true}
      ></ListView>);
    }

    return (
      <View style={styles.container}>
        <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Search for a project..."
        style={styles.searchBarInput}
        onEndEditing={this.onSearchChange}
        />
        {content}
      </View>
    );
  },

  renderRow: function(repo: Object) {
    var img = '';
    var title = repo.name || '';
    var artist = '';
    if (repo.artists && repo.artists.length) {
      artist = repo.artists[0].name;
    }
    return (
      <View>
      <TouchableOpacity onPress={function () {this.play(repo.id)}.bind(this)}>
        <View style={styles.row}>
          <View style={styles.textcontainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{artist}</Text>
          </View>
        </View>
        </TouchableOpacity>
        <View style={styles.cellBorder} />
      </View>
    );
  },

  play: function (id) {
    var url = 'http://music.163.com/api/song/detail/?id=' + id + '&ids=%5B' + id + '%5D&csrf_token=';
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.songs && responseData.songs.length) {
          PlayMusic.play(responseData.songs[0].mp3Url);
        }
      }).done();
  }
});

AppRegistry.registerComponent('MusicPlayer', () => MusicPlayer);
