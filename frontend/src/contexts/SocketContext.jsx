import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const { isAuthenticated, token } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      console.log('Initializing socket connection...');
      
      const socketUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      const newSocket = io(socketUrl, {
        transports: ['websocket', 'polling'],
        withCredentials: true,
        timeout: 10000,
        reconnectionAttempts: 3,
        reconnectionDelay: 1000,
        autoConnect: true
      });

      newSocket.on('connect', () => {
        setIsConnected(true);
        console.log('✅ Socket connected successfully with ID:', newSocket.id);
        setConnectionError(null);
      });

      newSocket.on('disconnect', (reason) => {
        setIsConnected(false);
        console.log('🔌 Socket disconnected. Reason:', reason);
      });

      newSocket.on('connect_error', (error) => {
        console.error('❌ Socket connection error:', error);
        setIsConnected(false);
        setConnectionError(error.message);
        
        // Don't attempt to reconnect if it's an invalid namespace error
        // if (error.message.includes('Invalid namespace')) {
        //   console.warn('Invalid namespace error, disabling socket');
        //   newSocket.disconnect();
        // }
      // });

      // newSocket.on('error', (error) => {
      //   console.error('Socket error:', error);
      //   setConnectionError(error.message);
      });

      setSocket(newSocket);

      return () => {
        console.log('🧹 Cleaning up socket connection');
        if (newSocket) {
          newSocket.removeAllListeners();
          newSocket.disconnect();
        }
      };
    } else {
      // Clean up socket if user is not authenticated
      if (socket) {
        console.log('👤 User not authenticated, cleaning up socket');
        socket.disconnect();
        setSocket(null);
        setIsConnected(false);
        setConnectionError(null);
      }
    }
  }, [isAuthenticated, token]);

  const joinContest = (contestId) => {
    if (socket && isConnected) {
      socket.emit('join-contest', contestId);
    }
  };

  const leaveContest = (contestId) => {
    if (socket && isConnected) {
      socket.emit('leave-contest', contestId);
    }
  };

  const submitContestSolution = (data) => {
    if (socket && isConnected) {
      socket.emit('contest-submission', data);
    }
  };

  const joinQuestion = (questionId) => {
    if (socket && isConnected) {
      socket.emit('join-question', questionId);
    }
  };

  const sendCodeChange = (data) => {
    if (socket && isConnected) {
      socket.emit('code-change', data);
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

  const onCodeUpdate = (callback) => {
    if (socket) {
      socket.on('code-update', callback);
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

  const offCodeUpdate = (callback) => {
    if (socket) {
      socket.off('code-update', callback);
    }
  };

  const value = {
    socket,
    isConnected,
    connectionError,
    joinContest,
    leaveContest,
    submitContestSolution,
    joinQuestion,
    sendCodeChange,
    onContestUpdate,
    onOpponentSubmission,
    onCodeUpdate,
    offContestUpdate,
    offOpponentSubmission,
    offCodeUpdate,
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