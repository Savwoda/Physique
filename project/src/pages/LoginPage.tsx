import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Github, Apple } from 'lucide-react';
import Logo from '../components/ui/Logo';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      navigate('/welcome');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark-950">
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8">
        <motion.div 
          className="sm:mx-auto sm:w-full sm:max-w-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>
          <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in to your account
          </h2>
        </motion.div>

        <motion.div 
          className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-dark-900 px-6 py-8 rounded-xl shadow-lg">
            <form className="space-y-6" onSubmit={handleLogin}>
              <Input
                label="Email address"
                type="email"
                id="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail size={18} className="text-dark-400" />}
              />

              <div>
                <Input
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  leftIcon={<Lock size={18} className="text-dark-400" />}
                />
                <div className="mt-2 text-right">
                  <a href="#" className="text-sm text-primary-500 hover:text-primary-400">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <Button 
                  type="submit" 
                  fullWidth 
                  isLoading={isLoading}
                  rightIcon={<ArrowRight size={18} />}
                >
                  Sign in
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-dark-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-dark-900 text-dark-400">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="outline" className="py-2.5">
                  <Github size={18} className="mr-2" />
                  Google
                </Button>
                <Button variant="outline" className="py-2.5">
                  <Apple size={18} className="mr-2" />
                  Apple
                </Button>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-dark-400">
            Not a member?{' '}
            <a href="#" className="font-medium text-primary-500 hover:text-primary-400">
              Start your free trial
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;