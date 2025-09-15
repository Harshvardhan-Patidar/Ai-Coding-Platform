import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const { isAuthenticated, token } = useAuth();

  useEffect(() => {
    if (isAuthenticated && token) {
      const newSocket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000', {
        auth: {
          token,
        },
      });

      newSocket.on('connect', () => {
        setIsConnected(true);
        console.log('Connected to server');
      });

      newSocket.on('disconnect', () => {
        setIsConnected(false);
        console.log('Disconnected from server');
      });

      newSocket.on('connect_error', (error) => {
        console.error('Connection error:', error);
        setIsConnected(false);
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
        setIsConnected(false);
      }
    }
  }, [isAuthenticated, token]);

  const joinContest = (contestId) => {
    if (socket) {
      socket.emit('join-contest', contestId);
    }
  };

  const leaveContest = (contestId) => {
    if (socket) {
      socket.emit('leave-contest', contestId);
    }
  };

  const submitContestSolution = (data) => {
    if (socket) {
      socket.emit('contest-submission', data);
    }
  };

  const onContestUpdate = (callback) => {
    if (socket) {
      socket.on('contest-update', callback);
    }
  };

  const onOpponentSubmission = (callback) => {
    if (socket) {
      socket.on('opponent-submission', callback);
    }
  };

  const offContestUpdate = (callback) => {
    if (socket) {
      socket.off('contest-update', callback);
    }
  };

  const offOpponentSubmission = (callback) => {
    if (socket) {
      socket.off('opponent-submission', callback);
    }
  };

  const value = {
    socket,
    isConnected,
    joinContest,
    leaveContest,
    submitContestSolution,
    onContestUpdate,
    onOpponentSubmission,
    offContestUpdate,
    offOpponentSubmission,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
}
