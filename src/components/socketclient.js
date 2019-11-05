import io from 'socket.io-client';

import { useEffect } from 'react';

function socketConnect() {
  // ===========socket-io=============
  const socket = io('http://localhost:3000');
  socket.on('server-request-client-init-info', function() {
    const data = {
      userId: '5db93586a4e8aa3c80ea65ac',
      name: 'Nguyễn Sĩ Văn'
    };
    socket.emit('client-send-init-info', data);
    console.log('send id');
  });
  socket.emit('client-play-now');
  console.log('play now');
  socket.on('server-send-room', function(msg) {
    console.log('room', msg);
  });
  socket.on('server-send-new-message', function(msg) {
    console.log('server send', msg);
  });
  //  ===========offline============
}
const useScript = () => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = socketConnect();
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  });
};
export default useScript;
