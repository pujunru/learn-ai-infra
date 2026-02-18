import { Week } from "./types";

export const ROADMAP: Week[] = [
  {
    id: "week-1",
    title: "Week 1: The Foundation",
    goal: "Understand memory usage and scaling across multiple GPUs on one node.",
    order: 1,
    modules: [
      {
        id: "module-1",
        weekId: "week-1",
        title: "Transformer Workload & Memory Anatomy",
        goal: "Learn where weights, activations, gradients, and optimizer states live.",
        dayStart: 1,
        dayEnd: 3,
        tasks: [
          {
            id: "task-1",
            moduleId: "module-1",
            type: "concept",
            title: "Understand weights vs activations vs gradients vs optimizer states",
          },
          {
            id: "task-2",
            moduleId: "module-1",
            type: "reading",
            title: "Read Attention Is All You Need (architecture size focus)",
          },
          {
            id: "task-3",
            moduleId: "module-1",
            type: "code",
            title: "Study nanoGPT model.py",
            resourceUrl: "https://github.com/karpathy/nanoGPT",
          },
        ],
      },
      {
        id: "module-2",
        weekId: "week-1",
        title: "Distributed Data Parallelism (DDP) & FSDP",
        goal: "Compare replication and sharding, and understand AllReduce.",
        dayStart: 4,
        dayEnd: 7,
        tasks: [
          {
            id: "task-4",
            moduleId: "module-2",
            type: "concept",
            title: "Explain model replication vs sharding and when to use each",
          },
          {
            id: "task-5",
            moduleId: "module-2",
            type: "reading",
            title: "Read PyTorch FSDP whitepaper/blog",
          },
          {
            id: "task-6",
            moduleId: "module-2",
            type: "code",
            title: "Run torch.distributed examples",
            resourceUrl: "https://pytorch.org/tutorials/intermediate/ddp_tutorial.html",
          },
        ],
      },
    ],
  },
  {
    id: "week-2",
    title: "Week 2: Scaling Up - 3D Parallelism",
    goal: "Break the model across GPUs when one GPU is not enough.",
    order: 2,
    modules: [
      {
        id: "module-3",
        weekId: "week-2",
        title: "Tensor Parallelism (TP)",
        goal: "Slice matrix multiplications across multiple GPUs.",
        dayStart: 8,
        dayEnd: 10,
        tasks: [
          {
            id: "task-7",
            moduleId: "module-3",
            type: "concept",
            title: "Map tensor partitioning for attention and MLP blocks",
          },
          {
            id: "task-8",
            moduleId: "module-3",
            type: "reading",
            title: "Read Megatron-LM model parallelism paper",
          },
          {
            id: "task-9",
            moduleId: "module-3",
            type: "code",
            title: "Explore NVIDIA/Megatron-LM code paths",
            resourceUrl: "https://github.com/NVIDIA/Megatron-LM",
          },
        ],
      },
      {
        id: "module-4",
        weekId: "week-2",
        title: "Pipeline Parallelism (PP) & The Optimizer",
        goal: "Split layers, reduce bubbles, and understand ZeRO tradeoffs.",
        dayStart: 11,
        dayEnd: 14,
        tasks: [
          {
            id: "task-10",
            moduleId: "module-4",
            type: "concept",
            title: "Explain pipeline bubbles and micro-batch scheduling",
          },
          {
            id: "task-11",
            moduleId: "module-4",
            type: "reading",
            title: "Read GPipe and ZeRO papers",
          },
          {
            id: "task-12",
            moduleId: "module-4",
            type: "code",
            title: "Study Microsoft/DeepSpeed implementation",
            resourceUrl: "https://github.com/microsoft/DeepSpeed",
          },
        ],
      },
    ],
  },
  {
    id: "week-3",
    title: "Week 3: The Metal - Hardware & Communication",
    goal: "Understand hardware bottlenecks and communication primitives.",
    order: 3,
    modules: [
      {
        id: "module-5",
        weekId: "week-3",
        title: "GPU Architecture & NCCL",
        goal: "Connect memory hierarchy, FLOPS/bandwidth, and collectives.",
        dayStart: 15,
        dayEnd: 21,
        tasks: [
          {
            id: "task-13",
            moduleId: "module-5",
            type: "concept",
            title: "Compare HBM vs SRAM and compute intensity",
          },
          {
            id: "task-14",
            moduleId: "module-5",
            type: "reading",
            title: "Read H100 whitepaper sections + FlashAttention",
          },
          {
            id: "task-15",
            moduleId: "module-5",
            type: "code",
            title: "Run nccl-tests and record bandwidth",
            resourceUrl: "https://github.com/NVIDIA/nccl-tests",
          },
        ],
      },
    ],
  },
  {
    id: "week-4",
    title: "Week 4: Post-Training & Inference",
    goal: "Understand SFT/RLHF pipelines and efficient serving patterns.",
    order: 4,
    modules: [
      {
        id: "module-6",
        weekId: "week-4",
        title: "RLHF & Fine-tuning Pipelines",
        goal: "Manage memory and interactions between policy/reference/reward/critic models.",
        dayStart: 22,
        dayEnd: 25,
        tasks: [
          {
            id: "task-16",
            moduleId: "module-6",
            type: "concept",
            title: "Map the 4-model RLHF loop and memory pressure points",
          },
          {
            id: "task-17",
            moduleId: "module-6",
            type: "reading",
            title: "Read DeepSpeed-Chat or InstructGPT pipeline",
          },
          {
            id: "task-18",
            moduleId: "module-6",
            type: "code",
            title: "Inspect a practical RLHF training stack",
            resourceUrl: "https://github.com/microsoft/DeepSpeedExamples",
          },
        ],
      },
      {
        id: "module-7",
        weekId: "week-4",
        title: "Efficient Inference",
        goal: "Understand KV cache, PagedAttention, and continuous batching.",
        dayStart: 26,
        dayEnd: 30,
        tasks: [
          {
            id: "task-19",
            moduleId: "module-7",
            type: "concept",
            title: "Explain KV cache lifecycle and memory tradeoffs",
          },
          {
            id: "task-20",
            moduleId: "module-7",
            type: "reading",
            title: "Study PagedAttention and continuous batching concepts",
          },
          {
            id: "task-21",
            moduleId: "module-7",
            type: "code",
            title: "Explore vLLM code and serving architecture",
            resourceUrl: "https://github.com/vllm-project/vllm",
          },
        ],
      },
    ],
  },
];

export const ALL_MODULES = ROADMAP.flatMap((week) => week.modules);
export const ALL_TASKS = ALL_MODULES.flatMap((module) => module.tasks);
