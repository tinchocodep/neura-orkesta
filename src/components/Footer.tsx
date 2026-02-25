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
                        <div className="flex gap-4">
                            <motion.a
                                whileHover={{ scale: 1.1 }}
                                href="#"
                                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                            >
                                <Mail className="w-5 h-5" />
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.1 }}
                                href="#"
                                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                            >
                                <Linkedin className="w-5 h-5" />
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.1 }}
                                href="#"
                                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                            >
                                <Twitter className="w-5 h-5" />
                            </motion.a>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm">
                        © 2026 NEURACALL S.A. Todos los derechos reservados.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-400">
                        <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                        <a href="#" className="hover:text-white transition-colors">Términos</a>
                        <a href="#" className="hover:text-white transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
