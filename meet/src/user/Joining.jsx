import React, { useEffect, useRef, useState } from 'react';

const Joining = () => {
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Get user media
  useEffect(() => {
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing media devices.", err);
      }
    };

    getMedia();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const toggleMic = () => {
    if (streamRef.current) {
      const audioTracks = streamRef.current.getAudioTracks();
      if (audioTracks.length > 0) {
        const enabled = audioTracks[0].enabled;
        audioTracks[0].enabled = !enabled;
        setMicOn(!enabled);
      }
    }
  };

  const toggleCam = () => {
    if (streamRef.current) {
      const videoTracks = streamRef.current.getVideoTracks();
      if (videoTracks.length > 0) {
        const enabled = videoTracks[0].enabled;
        videoTracks[0].enabled = !enabled;
        setCamOn(!enabled);
      }
    }
  };

  return (
    <>
      <nav className="navbar navbar-white bg-white shadow-sm">
        <div className="container-fluid">
          <h2 className="ms-5">MeetUpz</h2>
        </div>
      </nav>

      <div className="container">
        <div className="row mt-3">
          {/* Video Area */}
          <div className="col-sm-8 mb-4 mt-4">
            <div
              className="screen bg-dark rounded-3 w-100 d-flex align-items-end justify-content-center position-relative"
              style={{ height: '450px' }}
            >
              <video
                ref={videoRef}
                autoPlay
                muted
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '0.5rem'
                }}
              />

              <div className="access-btn w-100 d-flex justify-content-center mb-3 gap-5 position-relative">
                {/* Mic Button */}
                <button
                  className="rounded-circle border-white bg-transparent border-1"
                  onClick={toggleMic}
                  title="Toggle Microphone"
                >
                  <i
                    className={`bi ${micOn ? 'bi-mic-fill' : 'bi-mic-mute-fill'} ${micOn ? 'text-white' : 'text-danger'} fs-2 p-1`}
                  ></i>
                </button>

                {/* Cam Button */}
                <button
                  className="rounded-circle border-white bg-transparent border-1"
                  onClick={toggleCam}
                  title="Toggle Camera"
                >
                  <i
                    className={`bi ${camOn ? 'bi-camera-video-fill' : 'bi-camera-video-off-fill'} ${camOn ? 'text-white' : 'text-danger'} fs-2 p-1`}
                  ></i>
                </button>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="col d-flex align-items-center mt-5">
            <div className="option w-100 mt-5">
              <h3 className="text-center">Ready to Join?</h3>
              <p className="text-center">No one else is here</p>

              <div className="button d-flex justify-content-evenly gap-3">
                <button type="button" className="btn btn-primary rounded-pill w-50">
                  Join now
                </button>
                <button type="button" className="btn btn-white border shadow-sm rounded-pill w-50">
                  Present
                </button>
              </div>

              <p className="text-center mt-5">Other joining options</p>
              <p className="text-center text-primary">Use Companion Mode</p>
              <p className="text-center text-primary">Join and use a phone for audio</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Joining;
