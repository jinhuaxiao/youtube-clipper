import React, { useState } from 'react';
import { Youtube, Scissors, Upload, ImageIcon } from 'lucide-react';

// 简单的按钮组件
const Button = ({ children, ...props }) => (
  <button
    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
    {...props}
  >
    {children}
  </button>
);

// 简单的输入组件
const Input = ({ ...props }) => (
  <input
    className="border border-gray-300 rounded px-3 py-2 w-full"
    {...props}
  />
);

// 简单的进度条组件
const Progress = ({ value }) => (
  <div className="w-full bg-gray-200 rounded">
    <div
      className="bg-blue-500 rounded h-2 transition-all duration-300 ease-in-out"
      style={{ width: `${value}%` }}
    ></div>
  </div>
);

const YouTubeClipper = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // 这里您会调用后端 API
    // 为了演示，我们只是模拟进度
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsProcessing(false);
      }
    }, 500);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">YouTube Video Clipper</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-2">
          <Input
            type="text"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="Enter YouTube URL"
            className="flex-grow"
          />
          <Button type="submit" disabled={isProcessing}>
            <Youtube className="mr-2 h-4 w-4" /> Clip
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button type="button">
            <ImageIcon className="mr-2 h-4 w-4" /> Add Product Images
          </Button>
          <Button type="button">
            <Upload className="mr-2 h-4 w-4" /> Upload to TikTok/Instagram
          </Button>
        </div>
      </form>
      {isProcessing && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center space-x-2">
            <Scissors className="h-4 w-4" />
            <span>Processing video...</span>
          </div>
          <Progress value={progress} />
        </div>
      )}
    </div>
  );
};

export default YouTubeClipper;