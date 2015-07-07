//
//  AudioPlayerManager.h
//  ReactARTCanvas
//
//  Created by baipan on 15/6/2.
//  Copyright (c) 2015年 Facebook. All rights reserved.
//

#import "RCTBridgeModule.h"
#import <AVFoundation/AVFoundation.h>
@interface AudioPlayerManager : NSObject <RCTBridgeModule, AVAudioPlayerDelegate>
@end
