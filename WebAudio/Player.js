Blackprint.registerNode('WebAudio/Player',
class PlayerNode extends Blackprint.Node {
	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/WebAudio/Player');
		iface.title = 'Media Player';
		iface.description = 'WebAudio media player';

		this.output = {
			AudioNode: AudioNode,
			Element: HTMLVideoElement,
			VideoTrack: MediaStreamTrack,
			AudioTrack: MediaStreamTrack
		};

		this.input = {
			URL: String,
			Play: Blackprint.Port.Trigger(function(){
				iface.player.play();
			}),
			Pause: Blackprint.Port.Trigger(function(){
				iface.player.pause();
			}),
		}
	}
});

Blackprint.registerInterface('BPIC/WebAudio/Player',
Context.IFace.Player = class PlayerIFace extends Blackprint.Interface {
	constructor(node){
		super(node);
		this.player ??= document.createElement('video');
	}

	init(){
		let iface = this;
		iface.player.crossOrigin = 'anonymouse';
		iface.player.preload = 'auto';
		iface.player.autoload = true;

		iface.node.output.Element = iface.player;
		iface.node.output.AudioNode = ScarletsMedia.audioContext.createMediaElementSource(iface.player);

		// Fix video sync
		iface.node.output.AudioNode.connect(fakeDestination);

		// Update tracks after the file is playable
		iface.player.oncanplay = function(){
			var mediaStream = iface.player.captureStream();
			iface.node.output.AudioTrack = mediaStream.getAudioTracks()[0];
			iface.node.output.VideoTrack = mediaStream.getVideoTracks()[0];

			iface.player.pause();
		}

		iface.input.URL.on('value', function(port){
			iface.player.src = port.value;
		})
	}
});