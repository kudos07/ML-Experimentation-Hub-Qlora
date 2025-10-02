export default function Home() {
  return (
    <main
      style={{
        backgroundColor: "#f9fafb",
        fontFamily: "Segoe UI, sans-serif",
        padding: "2rem 1.5rem",
        color: "#1a202c",
        lineHeight: "1.75",
        maxWidth: "850px",
        margin: "0 auto",
      }}
    >
      {/* Main Title */}
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
        Introduction to QLoRA: Efficient Fine-Tuning with Quantization
      </h1>

      {/* Section 1: Introduction */}
      <h2 style={{ fontSize: "1.75rem", fontWeight: "600", marginBottom: "1rem", color: "#2d3748" }}>
        1. Introduction
      </h2>
      <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
        QLoRA (Quantized LoRA) is an extension of LoRA that makes it possible to fine-tune
        very large models, like LLaMA-65B, on a single GPU. It combines two ideas:
        parameter-efficient adapters from LoRA and 4-bit quantization of the base model
        weights. This drastically reduces GPU memory requirements while still achieving
        near full fine-tuning quality.
      </p>

      <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
        The key breakthrough is that the base model is never stored in full precision.
        Instead, it is loaded in a quantized form, while LoRA adapters are trained in
        higher precision. This balance keeps training stable and affordable without
        sacrificing accuracy.
      </p>

{/* Section 2: Problem Statement */}
{/* Section 2: Problem Statement */}
<h2
  style={{
    fontSize: "1.75rem",
    fontWeight: "600",
    marginTop: "2rem",
    marginBottom: "1rem",
    color: "#2d3748",
  }}
>
  2. Problem Statement – Why isn’t LoRA alone enough?
</h2>

<p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
  LoRA made fine-tuning more efficient by reducing the number of trainable parameters.
  Instead of updating billions of weights, it learns only small low-rank matrices.
  This works well for medium and large models, but when models reach <strong>tens of
  billions of parameters</strong> like LLaMA-65B or GPT-3, LoRA alone is not enough.
</p>

<p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
  The reason is simple: even if you only train a few million adapter parameters, the
  <strong>base model still needs to be loaded in full precision</strong> (FP16/FP32)
  into GPU memory. For a 65B parameter model, this means hundreds of gigabytes just
  to store the frozen weights — far more than what a single GPU can handle.
</p>

<p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
  This is where <strong>QLoRA</strong> comes in. By applying <strong>4-bit
  quantization</strong> to the frozen base model while keeping LoRA adapters in higher
  precision, it makes fine-tuning ultra-large models possible on a single GPU without
  losing accuracy.
</p>

{/* Full-width centered image */}
{/* <div style={{ textAlign: "center", margin: "2rem 0" }}>
  <img
    src="/images/qlora-image.png"
    alt="Memory requirements comparison"
    style={{
      maxWidth: "100%",
      width: "600px",
      borderRadius: "12px",
      boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
      marginBottom: "0.5rem",
    }}
  />
  <p style={{ fontSize: "0.9rem", color: "#4a5568" }}>
    <em>Figure 1: Even with LoRA, large frozen models exceed GPU memory.  
    QLoRA solves this with 4-bit quantization + LoRA adapters.</em>
  </p>
</div> */}

{/* Key Definitions */}
<div
  style={{
    backgroundColor: "#f7fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "1.5rem",
    marginTop: "2rem",
    marginBottom: "2rem",
  }}
>
  <h3
    style={{
      fontSize: "1.5rem",
      fontWeight: "600",
      marginBottom: "1rem",
      color: "#2d3748",
    }}
  >
    Key Definitions
  </h3>

  <p style={{ fontSize: "1.05rem", marginBottom: "1rem" }}>
    <strong>Full Fine-Tuning:</strong> Updating <em>all</em> model weights for a new task.
    Effective but extremely costly for models with billions of parameters.
  </p>

  <p style={{ fontSize: "1.05rem", marginBottom: "1rem" }}>
    <strong>LoRA (Low-Rank Adaptation):</strong> Efficient fine-tuning that freezes most
    weights and adds small trainable matrices. Great for medium/large models, but still
    requires loading the entire base model in memory.
  </p>

  <p style={{ fontSize: "1.05rem", marginBottom: "1rem" }}>
    <strong>Quantization:</strong> Reducing the precision of weights (e.g. FP32 → int8 or int4).
    Shrinks the memory footprint by 4–8× while keeping accuracy high.
  </p>

  <p style={{ fontSize: "1.05rem", marginBottom: "0" }}>
    <strong>QLoRA:</strong> A combination of 4-bit quantization for frozen weights and LoRA
    adapters trained in higher precision, enabling fine-tuning of 65B+ models on a single GPU.
  </p>
</div>
{/* Section 3: How QLoRA Works */}
<h2
  style={{
    fontSize: "1.75rem",
    fontWeight: "600",
    marginTop: "2rem",
    marginBottom: "1rem",
    color: "#2d3748",
  }}
>
  3. How QLoRA Works
</h2>

<p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
  QLoRA makes very large models trainable on a single GPU by doing two things at the same time.
  First, it <strong>stores the frozen base model in 4-bit precision</strong>.
  Second, it <strong>adds LoRA adapters</strong> that are trained in higher precision.
  The base is small in memory, the adapters learn the task, and the two combine at run time.
</p>

<p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
  Write a linear layer with weight <em>W</em> as the sum of a quantized frozen part and a
  low-rank trainable update:
</p>

<pre
  style={{
    backgroundColor: "#edf2f7",
    padding: "1rem",
    borderRadius: "8px",
    overflowX: "auto",
    fontSize: "1rem",
    marginBottom: "1rem",
    textAlign: "center",
  }}
>
{`W ≈ Dequantize_4bit(W_q)  +  B A
with   B ∈ ℝ^{d×r},  A ∈ ℝ^{r×k},  r ≪ min(d, k)`}
</pre>

<p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
  During the forward pass, the layer computes:
</p>

<pre
  style={{
    backgroundColor: "#edf2f7",
    padding: "1rem",
    borderRadius: "8px",
    overflowX: "auto",
    fontSize: "1rem",
    marginBottom: "1rem",
    textAlign: "center",
  }}
>
{`h = x · Dequantize_4bit(W_q)  +  x · (B A)`}
</pre>

<p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
  Gradients flow only into <em>A</em> and <em>B</em>. The 4-bit weights <em>W_q</em> stay frozen.
  This gives LoRA&apos;s parameter efficiency plus the huge memory savings from quantization.
</p>

{/* Full-width figure between text */}
<div style={{ textAlign: "center", margin: "2rem 0" }}>
  <img
    src="/ML-Experimentation-Hub-Qlora/images/qlora-image.png"
    alt="QLoRA: 4-bit base weights with LoRA adapters"
    style={{
      maxWidth: "100%",
      width: "720px",
      borderRadius: "12px",
      boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
      marginBottom: "0.5rem",
    }}
  />
  <p style={{ fontSize: "0.9rem", color: "#4a5568" }}>
    <em>Figure 1: Comparison of fine-tuning methods. Full fine-tuning updates all weights and requires huge memory. LoRA reduces trainable parameters but still needs the full base model in high precision. QLoRA goes further by storing the base in 4-bit precision and training small low-rank adapters, achieving massive memory savings while preserving accuracy.</em>
  </p>
</div>

{/* Subsection: 4-bit quantization details */}
<h3
  style={{
    fontSize: "1.35rem",
    fontWeight: "600",
    marginTop: "0.5rem",
    marginBottom: "0.75rem",
    color: "#2d3748",
  }}
>
  3.1 Quantize the frozen base to 4-bit
</h3>

<p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
  QLoRA uses block-wise 4-bit quantization so each small block of weights has its own scale.
  A simple reconstruction looks like this:
</p>

<pre
  style={{
    backgroundColor: "#edf2f7",
    padding: "1rem",
    borderRadius: "8px",
    overflowX: "auto",
    fontSize: "1rem",
    marginBottom: "1rem",
  }}
>
{`For each block b:
  W_q[b]  = Quantize_4bit(W[b], scale_b)
  Ŵ[b]    = Dequantize_4bit(W_q[b], scale_b)  ≈  scale_b · codebook[W_q[b]]`}
</pre>

<p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
  The codebook is shaped for weight distributions so reconstruction is accurate.
  Only small 4-bit codes and per-block scales are stored in GPU memory which cuts the footprint by about 4x compared with FP16.
</p>

{/* Subsection: LoRA injection */}
<h3
  style={{
    fontSize: "1.35rem",
    fontWeight: "600",
    marginTop: "0.5rem",
    marginBottom: "0.75rem",
    color: "#2d3748",
  }}
>
  3.2 Add low-rank adapters on top
</h3>

<p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
  LoRA inserts two small matrices <em>B</em> and <em>A</em> with rank <em>r</em>.
  Often only attention projections are adapted, for example the matrices for
  queries, keys, values, and outputs. The trainable parameter count becomes
  <code>r × (d + k)</code> per adapted layer instead of <code>d × k</code>.
</p>

<pre
  style={{
    backgroundColor: "#edf2f7",
    padding: "1rem",
    borderRadius: "8px",
    overflowX: "auto",
    fontSize: "1rem",
    marginBottom: "1rem",
  }}
>
{`Toy numbers:
  Full update:   d = k = 1000  → 1,000,000 params
  LoRA update:   r = 8         → 8 × (1000 + 1000) = 16,000 params  (≈62× smaller)`}
</pre>

{/* Subsection: Training flow */}
<h3
  style={{
    fontSize: "1.35rem",
    fontWeight: "600",
    marginTop: "0.5rem",
    marginBottom: "0.75rem",
    color: "#2d3748",
  }}
>
  3.3 Training flow
</h3>

<p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
  The base weights remain in 4-bit. During compute, small blocks are
  dequantized on the fly to floating point, multiplied by activations, and discarded.
  Only the adapters keep gradients and optimizer state.
</p>

<pre
  style={{
    backgroundColor: "#edf2f7",
    padding: "1rem",
    borderRadius: "8px",
    overflowX: "auto",
    fontSize: "1rem",
    marginBottom: "1rem",
  }}
>
{`Forward:
  Y = x · Dequantize_4bit(W_q)  +  x · (B A)

Backward:
  ∂L/∂A, ∂L/∂B  are computed and updated
  W_q is frozen  →  no optimizer state for the base`}
</pre>

{/* Subsection: Double quantization and paged optimizers */}
<h3
  style={{
    fontSize: "1.35rem",
    fontWeight: "600",
    marginTop: "0.5rem",
    marginBottom: "0.75rem",
    color: "#2d3748",
  }}
>
  3.4 Extra savings and stability
</h3>

<p style={{ fontSize: "1.1rem", marginBottom: "0.75rem" }}>
  <strong>Double quantization.</strong> The per-block scales themselves are also
  compressed into a lower precision representation. This trims memory further with
  negligible loss.
</p>

<p style={{ fontSize: "1.1rem", marginBottom: "0.75rem" }}>
  <strong>Paged optimizers.</strong> Optimizer states for the adapters can exceed GPU
  memory on long sequences or large batches. Paged optimizers keep most state in CPU
  memory and page chunks to the GPU when needed. This avoids out-of-memory spikes while
  keeping throughput high.
</p>

{/* Subsection: Why accuracy holds */}
<h3
  style={{
    fontSize: "1.35rem",
    fontWeight: "600",
    marginTop: "0.5rem",
    marginBottom: "0.75rem",
    color: "#2d3748",
  }}
>
  3.5 Why accuracy holds
</h3>

<ul style={{ fontSize: "1.05rem", paddingLeft: "1.4rem", marginBottom: "1rem" }}>
  <li style={{ marginBottom: "0.5rem" }}>
    4-bit codes with good codebooks reconstruct the weight distribution with low bias.
  </li>
  <li style={{ marginBottom: "0.5rem" }}>
    The trainable part is low-rank but expressive and learns the task-specific shift.
  </li>
  <li style={{ marginBottom: "0.5rem" }}>
    Only a small number of parameters carry optimizer state which keeps training stable.
  </li>
</ul>

{/* Subsection: Quick memory intuition */}
<h3
  style={{
    fontSize: "1.35rem",
    fontWeight: "600",
    marginTop: "0.5rem",
    marginBottom: "0.75rem",
    color: "#2d3748",
  }}
>
  3.6 Quick memory intuition
</h3>

<pre
  style={{
    backgroundColor: "#edf2f7",
    padding: "1rem",
    borderRadius: "8px",
    overflowX: "auto",
    fontSize: "1rem",
    marginBottom: "1rem",
  }}
>
{`If the base has N parameters:
  FP16 storage   ≈ 2 · N bytes
  4-bit storage  ≈ 0.5 · N bytes   (≈4× smaller than FP16)
  LoRA adds only O(r · (d + k)) trainable params`}
</pre>

<p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
  In practice this is enough to move from multi-GPU full fine-tuning to a single modern GPU,
  while matching or closely tracking full-precision performance on many tasks.
</p>

<h2
  style={{
    fontSize: "1.75rem",
    fontWeight: "600",
    marginTop: "2rem",
    marginBottom: "1rem",
    color: "#2d3748",
  }}
>
  4. Innovations in QLoRA
</h2>

<p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
  QLoRA isn’t just about slapping LoRA adapters on a quantized model. The paper
  introduces <strong>three technical innovations</strong> that make fine-tuning
  large models possible without losing accuracy:
</p>

<h3 style={{ fontSize: "1.3rem", fontWeight: "600", marginTop: "1rem" }}>
  1. NF4 Quantization (NormalFloat4)
</h3>
<p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
  Traditional 4-bit quantization often hurts accuracy. QLoRA introduces
  <em>NormalFloat4 (NF4)</em>, a 4-bit data type designed specifically for
  weights that roughly follow a normal distribution. Instead of uniformly
  spacing the quantization levels, NF4 places them where most weight values
  lie, making the quantization error much smaller.
</p>

<p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
  In practice, this means QLoRA can load massive models (like 65B parameters)
  in just <strong>48 GB of GPU memory</strong> without sacrificing accuracy.
</p>

<h3 style={{ fontSize: "1.3rem", fontWeight: "600", marginTop: "1rem" }}>
  2. Double Quantization
</h3>
<p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
  The term can sound like we are quantizing the same weights twice, but that is
  not the case. In QLoRA the <strong>weights</strong> are quantized into 4-bit
  codes, and each block of weights also needs a <em>scaling factor</em> to map
  those codes back into the right numeric range.
</p>

<p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
  Normally those scaling factors would be stored in higher precision, but QLoRA
  applies a second step and <strong>quantizes the scaling factors themselves</strong>
  into 8-bit. This trims about <strong>0.37 bits per parameter</strong> on
  average, giving an extra memory saving without hurting accuracy.
</p>


<h3 style={{ fontSize: "1.3rem", fontWeight: "600", marginTop: "1rem" }}>
  3. Paged Optimizers
</h3>
<p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
  Optimizers like Adam store large states (e.g., momentum and variance) for
  every parameter. This is a problem when fine-tuning multi-billion-parameter
  models. QLoRA uses a <strong>paged optimizer</strong>, inspired by how
  operating systems use virtual memory. States are stored on the CPU and
  paged into GPU memory only when needed. This prevents out-of-memory (OOM)
  errors during training.
</p>

<p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
  Together, these three innovations make it possible to fine-tune a model as
  large as <strong>LLaMA-65B on a single 48GB GPU</strong> — something that was
  previously unthinkable.
</p>
<h2
  style={{
    fontSize: "1.75rem",
    fontWeight: "600",
    marginTop: "2rem",
    marginBottom: "1rem",
    color: "#2d3748",
  }}
>
  5. Results and Scaling
</h2>

<p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
  QLoRA’s main achievement is showing that even very large models like
  LLaMA-65B can be fine-tuned on a single 48GB GPU without losing accuracy.
  This is possible because the model is stored in 4-bit quantized form while
  LoRA adapters capture the task-specific updates.
</p>

<p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
  The paper demonstrates that QLoRA fine-tuned models match the quality of
  full fine-tuning across benchmarks while using dramatically less memory.
  In practice, this means research labs and smaller groups can work with
  models that previously required massive GPU clusters.
</p>

<div style={{ textAlign: "center", margin: "2rem 0" }}>
  <img
    src="/ML-Experimentation-Hub-Qlora/images/memory4bit.png"
    alt="QLoRA scaling memory usage"
    style={{
      maxWidth: "100%",
      borderRadius: "12px",
      boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
      marginBottom: "0.5rem",
    }}
  />
  <p style={{ fontSize: "0.95rem", color: "#4a5568" }}>
  <em>
    Figure: QLoRA scales efficiently to very large models. With quantization
    and LoRA adapters, LLaMA-65B can be fine-tuned on a single 48GB GPU while
    maintaining the same accuracy as full fine-tuning.
  </em>
</p>

</div>

<p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
  This scalability is one of the main reasons QLoRA gained popularity so
  quickly — it made large model fine-tuning practical and affordable.
</p>


<h2
  style={{
    fontSize: "1.75rem",
    fontWeight: "600",
    marginTop: "2rem",
    marginBottom: "1rem",
    color: "#2d3748",
  }}
>
  6. Hyperparameters: Rank r and Scaling α
</h2>

<p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
  In QLoRA, the two key hyperparameters come from LoRA itself: the adapter rank <em>r</em>
  and the scaling factor <em>α</em>. They determine how much capacity the adapters have
  and how strong their updates are compared to the frozen base model.
</p>

<p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
  The rank <em>r</em> sets the size of the low-rank matrices. A larger <em>r</em> gives
  the adapters more expressive power but increases memory and compute. In practice,
  surprisingly small ranks, such as 8 or 16, are enough to match full fine-tuning on many tasks.
</p>

<p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
  The scaling factor <em>α</em> controls the weight of the LoRA update. If it is too
  small the adapters underfit, and if it is too large they destabilize training.
  The paper finds that values like <em>α = 16</em> or <em>α = 32</em> strike a good balance.
</p>

<h2
  style={{
    fontSize: "1.75rem",
    fontWeight: "600",
    marginTop: "2rem",
    marginBottom: "1rem",
    color: "#2d3748",
  }}
>
  7. What QLoRA Was Tested On
</h2>

<p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
  QLoRA was tested on a wide range of benchmarks to check both general
  reasoning ability and instruction-following quality. The most well-known
  results come from the <strong>Guanaco family of models</strong>, which are
  QLoRA fine-tuned versions of LLaMA-7B, 13B, and 65B on high-quality
  instruction data.
</p>

<p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
  Benchmarks include <em>MMLU</em> for multitask reasoning, <em>PIQA</em> and
  <em>HellaSwag</em> for commonsense reasoning, and <em>BoolQ</em> for reading
  comprehension. Across these datasets, QLoRA models perform on par with
  full fine-tuning while using much less GPU memory.
</p>

<div style={{ textAlign: "center", margin: "2rem 0" }}>
  <img
    src="/ML-Experimentation-Hub-Qlora/images/benchmark.png"
    alt="QLoRA benchmark results"
    style={{
      maxWidth: "100%",
      borderRadius: "12px",
      boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
      marginBottom: "0.5rem",
    }}
  />
  <p style={{ fontSize: "0.95rem", color: "#4a5568" }}>
    <em>Table 6 from the QLoRA paper: Guanaco models fine-tuned with QLoRA
    reach up to 99 percent of ChatGPT performance on the Vicuna benchmark,
    showing that single-GPU fine-tuning can produce state-of-the-art chatbots.</em>
  </p>
</div>

<p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
  These results highlight why QLoRA quickly became a popular method. It not
  only saves memory but also produces models competitive with the best
  proprietary systems.
</p>
<h2
  style={{
    fontSize: "1.75rem",
    fontWeight: "600",
    marginTop: "2rem",
    marginBottom: "1rem",
    color: "#2d3748",
  }}
>
  8. Conclusion
</h2>

<p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
  QLoRA shows that it is possible to fine-tune massive language models on
  affordable hardware. By combining low-rank adapters with 4-bit quantization
  and stability tricks like NF4, double quantization, and paged optimizers,
  QLoRA makes single-GPU fine-tuning a reality.
</p>

<p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
  The method achieves accuracy on par with full fine-tuning while using only a
  fraction of the memory. This has lowered the barrier to entry for research
  labs and independent developers who want to experiment with billion-parameter
  models.
</p>

<p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
  This blog is based on the paper <em>“QLoRA: Efficient Finetuning of Quantized
  LLMs”</em> (Dettmers et al., 2023). For full details, see the original paper:{" "}
  <a
    href="https://arxiv.org/abs/2305.14314"
    target="_blank"
    style={{ color: "#3182ce" }}
  >
    https://arxiv.org/abs/2305.14314
  </a>
</p>

<p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
  All figures included here are taken directly from the QLoRA paper and belong
  to the authors. If any of the authors prefer that these figures not be used,
  please contact me and I will remove them immediately.
</p>


    </main>
  );
}
