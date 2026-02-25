import { motion } from 'framer-motion';
import { Mail, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-16">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="mb-12">
                    {/* Brand */}
                    <div className="max-w-md">
                        <h3 className="text-2xl font-display font-bold mb-4">NEURACALL</h3>
                        <p className="text-gray-400 mb-6 max-w-md">
                            Neuracall Orkesta - El motor de operaciones que tu empresa necesita para operar en tiempo real.
                        </p>
                        <div className="flex gap-5">
                            <motion.a
                                whileHover={{ scale: 1.15, opacity: 1 }}
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <Mail className="w-5 h-5" />
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.15, opacity: 1 }}
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <Linkedin className="w-5 h-5" />
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.15, opacity: 1 }}
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <Twitter className="w-5 h-5" />
                            </motion.a>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm">
                        © 2025 NEURACALL S.A. Todos los derechos reservados.
                    </p>

                </div>
            </div>
        </footer>
    );
}
