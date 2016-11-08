var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Plugin, Cordova } from './plugin';
/**
 * @name YoutubeVideoPlayer
 * @description
 * Plays YouTube videos in Native YouTube App
 *
 * @usage
 * ```
 * import {YoutubeVideoPlayer} from 'ionic-native';
 *
 * YouTubeVideoPlayer.openVideo('myvideoid');
 *
 * ```
 */
export var YoutubeVideoPlayer = (function () {
    function YoutubeVideoPlayer() {
    }
    /**
     * Plays a YouTube video
     * @param videoId {string} Video ID
     */
    YoutubeVideoPlayer.openVideo = function (videoId) { };
    __decorate([
        Cordova({ sync: true })
    ], YoutubeVideoPlayer, "openVideo", null);
    YoutubeVideoPlayer = __decorate([
        Plugin({
            plugin: 'https://github.com/Glitchbone/CordovaYoutubeVideoPlayer.git',
            pluginRef: 'YoutubeVideoPlayer',
            repo: 'https://github.com/Glitchbone/CordovaYoutubeVideoPlayer',
            platforms: ['Android', 'iOS']
        })
    ], YoutubeVideoPlayer);
    return YoutubeVideoPlayer;
}());
//# sourceMappingURL=youtube-video-player.js.map