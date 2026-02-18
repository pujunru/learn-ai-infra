# Plan

Here is a 4-week roadmap designed to take you from single-GPU concepts to multi-node distributed training.

Week 1: The Foundation – Memory & Data Parallelism
Goal: Understand where the memory goes and how to scale across multiple GPUs on one node.

Days 1-3: The Transformer Workload & Memory Anatomy

Concept: It’s not just weights. Learn about Activations, Gradients, and Optimizer States.

Reading: Attention Is All You Need (focus on the architecture sizes).

Code: Andrej Karpathy’s nanoGPT (specifically model.py).

Days 4-7: Distributed Data Parallelism (DDP) & FSDP

Concept: Replicating the model vs. sharding the model. The concept of "AllReduce."

Reading: PyTorch FSDP (Fully Sharded Data Parallel) whitepaper/blog.

Code: PyTorch torch.distributed examples.

Week 2: Scaling Up – 3D Parallelism
Goal: Breaking the model apart when it doesn't fit on one GPU (Model Parallelism).

Days 8-10: Tensor Parallelism (TP)

Concept: Slicing matrix multiplications across GPUs.

Reading: Megatron-LM: Training Multi-Billion Parameter Language Models Using Model Parallelism.

Code: NVIDIA/Megatron-LM repo.

Days 11-14: Pipeline Parallelism (PP) & The Optimizer

Concept: Splitting layers across GPUs and dealing with the "bubble" (idle time).

Reading: GPipe: Efficient Training of Giant Neural Networks and the ZeRO (Zero Redundancy Optimizer) paper.

Code: Microsoft/DeepSpeed repo.

Week 3: The Metal – Hardware & Communication
Goal: Understanding the hardware bottlenecks.

Days 15-21: GPU Architecture & NCCL

Concept: HBM vs. SRAM, compute intensity (FLOPS vs. Bandwidth), and communication primitives (AllReduce, AllGather, Broadcast).

Reading: NVIDIA H100 Whitepaper (focus on Transformer Engine) and FlashAttention paper.

Code: Run simple nccl-tests to benchmark bandwidth.

Week 4: Post-Training & Inference
Goal: The specific pipelines for SFT, RLHF, and Serving.

Days 22-25: RLHF & Fine-tuning Pipelines

Concept: Managing 4 models at once (Policy, Reference, Reward, Critic) in memory.

Reading: DeepSpeed-Chat or InstructGPT paper.

Days 26-30: Efficient Inference

Concept: KV Cache, PagedAttention, and Continuous Batching.

Code: vLLM project.
