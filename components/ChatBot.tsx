'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useChat } from 'ai/react';
import { MessageCircle, X, Send, User, Bot, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
        api: '/api/chat',
    });

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const toggleChat = () => setIsOpen(!isOpen);

    if (!messages) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Floating Action Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleChat}
                className="bg-black text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:bg-gray-800 border border-white/20"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="absolute bottom-20 right-0 w-[calc(100vw-2rem)] sm:w-[400px] h-[600px] max-h-[calc(100vh-120px)] bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-white/10"
                    >
                        {/* Header */}
                        <div className="p-5 bg-black text-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-xl">
                                    <Sparkles size={20} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm">Collabify AI Guide</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                        <span className="text-[10px] text-gray-400">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={toggleChat} className="text-gray-400 hover:text-white">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide"
                        >
                            {messages.length === 0 && (
                                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                                    <div className="w-16 h-16 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
                                        <Bot size={32} className="text-gray-400" />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="font-semibold text-gray-700 dark:text-gray-200">How can I help you today?</p>
                                        <p className="text-sm text-gray-500">I can help you with influencer tips, brand collaborations, or platform features.</p>
                                    </div>
                                </div>
                            )}

                            {messages.map((m: any) => (
                                <div
                                    key={m.id}
                                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3.5 rounded-2xl text-sm ${m.role === 'user'
                                            ? 'bg-black text-white rounded-br-none'
                                            : 'bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 rounded-bl-none'
                                            }`}
                                    >
                                        <div className="flex items-start gap-2">
                                            {m.role === 'assistant' && <Bot size={14} className="mt-1 flex-shrink-0" />}
                                            <div className="whitespace-pre-wrap leading-relaxed">{m.content}</div>
                                            {m.role === 'user' && <User size={14} className="mt-1 flex-shrink-0" />}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-100 dark:bg-zinc-800 p-4 rounded-2xl rounded-bl-none">
                                        <Loader2 size={18} className="animate-spin text-gray-500" />
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="p-3 bg-red-50 text-red-500 text-xs rounded-xl border border-red-100 italic">
                                    The chat service is currently unavailable.
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <form
                            onSubmit={handleSubmit}
                            className="p-4 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-zinc-900/50"
                        >
                            <div className="relative flex items-center">
                                <input
                                    value={input}
                                    onChange={handleInputChange}
                                    placeholder="Ask anything..."
                                    className="w-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-white/10 rounded-2xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 transition-all outline-none text-gray-700 dark:text-white"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="absolute right-2 p-2 bg-black text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                            <p className="text-[10px] text-center text-gray-400 mt-3">
                                Powered by Collabify AI Assistant
                            </p>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
