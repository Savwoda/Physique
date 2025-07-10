import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, Camera, Info, ArrowLeft, ArrowRight } from 'lucide-react';
import Logo from '../components/ui/Logo';
import Button from '../components/ui/Button';

const PhotoUploadPage: React.FC = () => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    if (!file.type.match('image.*')) {
      alert('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === 'string') {
        setUploadedImage(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleContinue = () => {
    navigate('/loading');
  };

  const handleBack = () => {
    navigate('/questionnaire');
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark-950">
      <header className="p-4">
        <Logo />
      </header>

      <div className="flex-1 flex flex-col px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-lg mx-auto w-full text-center"
        >
          <h2 className="text-2xl font-bold mb-2">Take or Upload a Photo</h2>
          <p className="text-dark-300 mb-6">
            For the most accurate analysis, please follow these guidelines.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="max-w-lg mx-auto w-full bg-dark-900 rounded-xl p-4 mb-6"
        >
          <div className="flex items-start gap-3">
            <Info size={20} className="text-primary-500 mt-0.5" />
            <div>
              <h3 className="font-medium mb-1">For best results:</h3>
              <ul className="text-sm text-dark-300 space-y-2">
                <li>• Stand straight with arms at your sides</li>
                <li>• Wear form-fitting clothes (or minimal clothing)</li>
                <li>• Use a neutral background</li>
                <li>• Ensure good lighting</li>
                <li>• Take both front and side photos if possible</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {uploadedImage ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto w-full rounded-xl overflow-hidden mb-6 relative"
          >
            <img 
              src={uploadedImage} 
              alt="Uploaded" 
              className="w-full object-cover"
              style={{ maxHeight: '400px' }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-950 p-4">
              <Button 
                variant="secondary" 
                onClick={() => setUploadedImage(null)}
                size="sm"
              >
                Remove Photo
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className={`
              max-w-lg mx-auto w-full border-2 border-dashed rounded-xl p-8
              flex flex-col items-center justify-center text-center
              ${isDragging ? 'border-primary-500 bg-dark-900' : 'border-dark-700'}
              transition-colors duration-200
            `}
            style={{ minHeight: '300px' }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="mb-4">
              <div className="w-16 h-16 rounded-full bg-dark-800 flex items-center justify-center mb-4 mx-auto">
                <Upload size={24} className="text-primary-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">Drag & drop your photo here</h3>
              <p className="text-dark-400 text-sm mb-6">or select a file from your computer</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <label>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Button
                  as="span"
                  leftIcon={<Upload size={18} />}
                >
                  Upload Photo
                </Button>
              </label>
              
              <Button
                variant="secondary"
                leftIcon={<Camera size={18} />}
              >
                Take Photo
              </Button>
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-4 md:p-6 flex justify-between">
        <Button
          variant="secondary"
          onClick={handleBack}
          leftIcon={<ArrowLeft size={18} />}
        >
          Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!uploadedImage}
          rightIcon={<ArrowRight size={18} />}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default PhotoUploadPage;