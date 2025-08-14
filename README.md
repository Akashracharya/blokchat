BLOKCHAT 💬🔗

BLOKCHAT is a modern, blockchain-integrated group chat platform built with React, Tailwind CSS, and Framer Motion, designed to provide secure, private, and verifiable conversations.
It combines real-time chat with decentralized storage, encryption, and an embedded AI assistant — all wrapped in a sleek, responsive, dark-themed interface.

🚀 Key Features

Three-Column Layout for rooms, chat, and AI assistant (responsive on mobile/tablet).
MetaMask Authentication for secure login via blockchain wallet.
Room Management — create, join, and browse chat rooms.
Encrypted Messaging — AES for message content, RSA/ECC for key sharing.
Blockchain Integration — store message hashes, timestamps, sender address, and room ID on a private blockchain (Ganache/Hyperledger).
IPFS Storage for encrypted message bodies with hash references on-chain.
Verification Status for each message (valid/invalid hash).
AI Assistant Panel for quick help or auto-replies (placeholder API for now).
Glassmorphism + Neon Accents with smooth animations using Framer Motion.

🛠 Tech Stack

Frontend: React + Vite + Tailwind CSS + Framer Motion  + typescript
Blockchain: web3.js / ethers.js (private chain: Ganache or Hyperledger)
Storage: IPFS HTTP Client
Encryption: crypto-js, node-forge
Authentication: MetaMask
