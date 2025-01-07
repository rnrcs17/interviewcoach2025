import { useEffect, useRef } from 'react';

const AudioVisualizer = ({ isRecording }) => {
  const canvasRef = useRef(null);
  const animationRequestIdRef = useRef(null);
  const audioContextRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const visualize = (stream) => {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      const analyser = audioContextRef.current.createAnalyser();
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      source.connect(analyser);

      const draw = () => {
        animationRequestIdRef.current = requestAnimationFrame(draw);

        analyser.getByteFrequencyData(dataArray);

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const barWidth = canvas.width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = dataArray[i] / 2;

          ctx.fillStyle = `#FC72FF`;
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

          x += barWidth + 1;
        }
      };

      draw();
    };

    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        visualize(stream);
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    };

    const stopRecording = () => {
      cancelAnimationFrame(animationRequestIdRef.current);
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };

    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }

    return () => {
      stopRecording();
    };
  }, [isRecording]);

  return <canvas ref={canvasRef} width={60} height={50}/>;
};

export default AudioVisualizer;
