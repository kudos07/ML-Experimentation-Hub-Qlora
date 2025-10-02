# 📘 QLoRA Blog – Efficient Fine-Tuning with Quantization

This repository is an educational **Next.js blog** that explains the paper:  
**QLoRA: Efficient Finetuning of Quantized LLMs (2023)** in a clear, beginner-friendly way.  
It breaks the research down into text, light math, and figures to make it accessible.

🌐 **Live demo:** [https://kudos07.github.io/ML-Experimentation-Hub-Qlora](https://kudos07.github.io/ML-Experimentation-Hub-Qlora)

---

## 📚 Reference & Credits
This blog is an educational interpretation of the paper:  
**QLoRA: Efficient Finetuning of Quantized LLMs (Dettmers et al., 2023)**  

📄 Original paper: [https://arxiv.org/abs/2305.14314](https://arxiv.org/abs/2305.14314)  

All figures included here are taken directly from the paper and belong to the original authors.  
If the authors prefer that these figures not be used, please contact me and I will remove or replace them immediately.  

---

## 📖 What’s Inside
The blog walks through QLoRA step by step:

1. Introduction to QLoRA  
2. Problem Statement – Why LoRA is not enough  
3. Key Definitions (LoRA, quantization, adapters)  
4. How QLoRA combines quantization + LoRA  
5. Technical Innovations (NF4, double quantization, paged optimizers)  
6. Results and scaling to LLaMA-65B on a single GPU  
7. Hyperparameters: rank `r` and scaling `α`  
8. Benchmarks and Guanaco results  
9. Conclusion  

All figures shown are taken directly from the original paper (Dettmers et al., 2023).  

---

## 🚀 Running Locally

Clone this repository:

```bash
git clone https://github.com/kudos07/ML-Experimentation-Hub-Qlora.git
cd ML-Experimentation-Hub-Qlora
