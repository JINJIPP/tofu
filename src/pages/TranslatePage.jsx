import React, { useState, useRef } from 'react';

const TranslatePage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [translationResult, setTranslationResult] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordingError, setRecordingError] = useState(null);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const streamRef = useRef(null);

  const startRecording = async () => {
    try {
      setIsRecording(true);
      setRecordingTime(0);
      setTranslationResult(null);
      setRecordingError(null);
      audioChunksRef.current = [];

      // 请求麦克风访问权限
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // 创建MediaRecorder实例
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      // 开始计时
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      // 处理录制数据
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      // 录制结束时处理音频数据
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(audioBlob);
        
        // 停止计时
        clearInterval(timerRef.current);
        
        // 关闭音频流
        stream.getTracks().forEach(track => track.stop());
        streamRef.current = null;
        
        // 模拟翻译结果
        simulateTranslation();
      };

      // 开始录制
      mediaRecorder.start();

      // 设置最长录制时间为10秒
      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          stopRecording();
        }
      }, 10000);

    } catch (error) {
      console.error('录制失败:', error);
      setRecordingError('无法访问麦克风，请检查权限设置');
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const simulateTranslation = () => {
    // 模拟AI翻译结果
    const catSounds = [
      {
        type: '低沉喵喵声',
        emotion: '满足',
        translation: '我现在很舒服，谢谢你的陪伴～',
        suggestion: '可以继续抚摸猫咪，保持当前的互动方式'
      },
      {
        type: '短暂喵喵声',
        emotion: '好奇',
        translation: '这是什么东西？看起来很有趣！',
        suggestion: '可以让猫咪探索新事物，增强它的好奇心'
      },
      {
        type: '拉长音喵喵声',
        emotion: '饥饿',
        translation: '我饿了，快给我准备食物吧！',
        suggestion: '检查猫粮碗，及时为猫咪提供食物'
      },
      {
        type: '快速连续喵喵声',
        emotion: '兴奋',
        translation: '快来和我一起玩！我已经准备好了！',
        suggestion: '拿出猫咪喜欢的玩具，陪它玩耍一段时间'
      }
    ];

    const randomResult = catSounds[Math.floor(Math.random() * catSounds.length)];
    setTranslationResult(randomResult);
  };

  const formatTime = (seconds) => {
    return `${seconds}秒`;
  };

  return (
    <div className="translate-page">
      <div className="translate-container">
        <h1 className="page-title">🐱 猫咪语言翻译器</h1>
        
        <div className="recording-section">
          <div className="recording-circle">
            <button 
              className={`record-button ${isRecording ? 'recording' : ''}`}
              onClick={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? (
                <div className="recording-animation">
                  <div className="wave-bar"></div>
                  <div className="wave-bar"></div>
                  <div className="wave-bar"></div>
                  <div className="wave-bar"></div>
                  <div className="wave-bar"></div>
                </div>
              ) : (
                <div className="mic-icon"></div>
              )}
            </button>
            <div className="recording-time">
              {isRecording && formatTime(recordingTime)}
            </div>
          </div>
          <p className="recording-hint">
            {isRecording ? '正在录音...请让猫咪发出声音' : '点击按钮开始录音'}
          </p>
        </div>

        {translationResult && (
          <div className="translation-result">
            <div className="result-header">
              <h2>翻译结果</h2>
              <div className="sound-type">
                <span className="type-label">声音类型：</span>
                <span className="type-value">{translationResult.type}</span>
              </div>
            </div>
            
            <div className="emotion-indicator">
              <span className="emotion-label">猫咪情绪：</span>
              <span className="emotion-value">{translationResult.emotion}</span>
            </div>
            
            <div className="translation-text">
              <p>{translationResult.translation}</p>
            </div>
            
            <div className="suggestion-box">
              <h3>💡 建议</h3>
              <p>{translationResult.suggestion}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranslatePage;