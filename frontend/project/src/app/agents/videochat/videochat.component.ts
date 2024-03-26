import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

@Component({
  selector: 'app-videochat',
  templateUrl: './videochat.component.html',
  styleUrls: ['./videochat.component.css']
})
export class VideochatComponent {
  constructor(private route: ActivatedRoute,private router:Router){}
roomId:string=''
@ViewChild('root')
root!: ElementRef;
ngOnInit(){
  this.route.params.subscribe(params => {
    this.roomId = params['roomId'];
    console.log("in videocall comonent==>",this.roomId);
  });
}
ngAfterViewInit() {
  const appID = 2036601577
      const serverSecret = "4cd29dc95523a7fa9f72e936abe8ff71";
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, this.roomId,  Date.now().toString(),  Date.now().toString());

      // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: this.root.nativeElement,
        sharedLinks: [
          {
            name: 'Personal link',
            url:
            window.location.protocol + '//' + 
            window.location.host + window.location.pathname +
              '?roomID=' +
              this.roomId,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
      });
}

}
