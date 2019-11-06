/* eslint-disable func-names */
/* eslint-disable camelcase */
import React from 'react';
import io from 'socket.io-client';
import $ from 'jquery';
import cookie from 'react-cookies';
import GameOnlineUi from '../containers/gameonlineui.container';
import * as types from '../constants/constants';

class GameOnline extends React.PureComponent {
  constructor() {
    super();
    this.imagesrc = `${types.stringConnect}/uploads/default_avatar.png`;
    this.newMessage = '';
    this.socket = null;
    this.typePlay = cookie.load('typePlay');
    this.room = '';
    this.mess = {
      messages: [{ id: 1, userId: 0, message: 'Hello' }],
      user: null
    };
  }

  UNSAFE_componentWillMount() {
    // const state = this.props;
    let currentRoom = '';
    let player2 = null;
    const id = cookie.load('id');
    const name = cookie.load('name');
    const { typePlay } = this;
    if (id !== '' || typePlay) {
      this.socket = io('http://localhost:3000');
      const sk = this.socket;
      this.socket.on('server-request-client-init-info', function() {
        const data = {
          userId: id,
          name
        };
        sk.emit('client-send-init-info', data);
      });
      this.socket.on('server-init-your-info-success', function() {
        if (typePlay === 'Create new game') {
          sk.emit('client-create-new-room');
        }
        if (typePlay === 'Play now') {
          sk.emit('client-play-now');
        }
      });
      // ==============================có player2=======================================
      this.socket.on('server-send-room', function(r) {
        try {
          console.log(r);
          currentRoom = r.room;
          $('#roomNumber').html('');
          $('#roomNumber').append($('<h4>').text(`Room: ${currentRoom}`));
          const d = new Date();
          d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000);
          const expires = `expires=${d.toUTCString()}`;
          document.cookie = `idPlayer1=${r.idPlayer1};${expires};path=/`;
          if (r.namePlayer1 !== name) {
            player2 = {
              name: r.namePlayer1,
              image: r.imagePlayer1
            };
          } else {
            player2 = {
              name: r.namePlayer2,
              image: r.imagePlayer2
            };
          }
          if (player2.name) {
            $('#roomNumber').html('');
            $('#roomNumber').append($('<h4>').text(`Room: ${currentRoom}`));
            $('#divPlayer2').visible();
            $('#divPlayer2').display();
            $('#namePlayer2').html(player2.name);
            $('#turnDiv').visible();
            if (player2.image) {
              $('#imagePlayer2').attr(
                'src',
                types.stringConnect + player2.image
              );
            } else {
              $('#imagePlayer2').attr(
                'src',
                `${types.stringConnect}/uploads/default_avatar.png`
              );
            }
            $('#buttonDraw').visible();
            $('#buttonDraw').display();
            $('#buttonSurrender').visible();
            $('#buttonSurrender').display();
            $('#gameBoard').visible();
          }
        } catch (err) {
          console.log(err);
        }
      });
      this.socket.on('server-send-new-message', function(msg) {
        if (msg.owner === 'competitor') {
          $('#messages').append(
            $('<div class="li-left li-name"></div>').text(`${player2.name}`)
          );
          $('#messages').append(
            $('<div class="li-left li-online"></div>').text(`${msg.message}`)
          );
        } else {
          $('#messages').append(
            $('<div class="li-right width100"></div>').text(' ')
          );
          $('#messages').append(
            $('<div class="li-left li-online li-mess-server"></div>').text(
              `${msg.message}`
            )
          );
        }
        const div = $('#divMessage');
        div.scrollTop(div.prop('scrollHeight'));
      });

      this.socket.on('server-enable-your-turn', function(turn) {
        console.log('cho phép đánh', turn);
      });
      this.socket.on('competitor-want-a-draw-game', function() {
        $('#notification').html('');
        $('#notification').append(
          $('<span>').text(`${player2.name} want a draw game?`)
        );
        $('#new-notification').visible();
        $('#new-notification').display();
      });
    }
  }

  render() {
    return <GameOnlineUi value={this} />;
  }
}

export default GameOnline;
