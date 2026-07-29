import { useMemo, useState } from "react";

type QuizAnswer = "ai" | "not-ai";

type QuizScenario = {
  id: string;
  scenario: string;
  answer: QuizAnswer;
  explanation: string;
};

const SCENARIOS: QuizScenario[] = [
  {
    id: "calculator",
    scenario: "A calculator adds the exact numbers you type.",
    answer: "not-ai",
    explanation:
      "Ordinary arithmetic follows fixed operations. It does not infer how to produce the answer from examples or other input.",
  },
  {
    id: "spam-filter",
    scenario: "An email service ranks new messages using patterns learned from earlier spam.",
    answer: "ai",
    explanation:
      "The system uses a learned model to infer whether a new message resembles spam. A separate rule may still decide what happens next.",
  },
  {
    id: "scheduled-light",
    scenario: "A light switches on at 7 pm because a timer was set for 7 pm.",
    answer: "not-ai",
    explanation:
      "The timer executes a rule chosen in advance. Automation can be useful without being AI.",
  },
  {
    id: "recommendations",
    scenario: "A streaming service predicts which program you may prefer from viewing patterns.",
    answer: "ai",
    explanation:
      "A recommendation model infers a ranking from input such as viewing behaviour. The exact implementation can vary by service.",
  },
  {
    id: "contact-form",
    scenario: "A contact form sends the same confirmation email after every submission.",
    answer: "not-ai",
    explanation:
      "This is a fixed workflow: when the form is submitted, send a stored message. No model is needed.",
  },
  {
    id: "speech",
    scenario: "A phone turns speech into text using a model trained on audio and transcripts.",
    answer: "ai",
    explanation:
      "The model infers likely text from a new audio signal. It can still make errors, especially with noise, accents or unfamiliar names.",
  },
  {
    id: "overtime-rule",
    scenario: "Payroll adds overtime whenever recorded hours exceed a fixed threshold.",
    answer: "not-ai",
    explanation:
      "A human-defined condition determines the result. This is conventional software unless another part of the system uses AI.",
  },
  {
    id: "drafting",
    scenario: "A writing tool generates a new product description from a prompt.",
    answer: "ai",
    explanation:
      "Generative AI infers a new output from the prompt. Fluent wording is not proof that the output is accurate.",
  },
];

export default function AiOrNotQuiz() {
  const [answers, setAnswers] = useState<Record<string, QuizAnswer>>({});

  const completed = Object.keys(answers).length;
  const score = useMemo(
    () =>
      SCENARIOS.reduce(
        (total, scenario) => total + (answers[scenario.id] === scenario.answer ? 1 : 0),
        0,
      ),
    [answers],
  );

  return (
    <section
      aria-labelledby="ai-or-not-heading"
      className="not-prose my-10 rounded-[30px] border-2 border-gray-950 bg-white p-5 shadow-[7px_7px_0_#111827] sm:p-8"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#4b1bd1]">
            MLAI learning exercise
          </p>
          <h2 id="ai-or-not-heading" className="mt-2 text-3xl font-black tracking-tight text-gray-950">
            AI or ordinary software?
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-700">
            Choose an answer, then read why. These examples use the OECD’s
            “infers from input” test; real products can combine AI, fixed rules
            and human decisions.
          </p>
        </div>
        <div
          aria-live="polite"
          className="shrink-0 rounded-2xl bg-[#fefc22] px-4 py-3 text-center text-sm font-black text-gray-950"
        >
          {completed === SCENARIOS.length
            ? `${score}/${SCENARIOS.length} correct`
            : `${completed}/${SCENARIOS.length} answered`}
        </div>
      </div>

      <div className="mt-7 space-y-4">
        {SCENARIOS.map((scenario, index) => {
          const selected = answers[scenario.id];
          const answeredCorrectly = selected === scenario.answer;

          return (
            <fieldset
              key={scenario.id}
              className="rounded-2xl border border-gray-300 bg-gray-50 p-4 sm:p-5"
            >
              <legend className="px-1 text-sm font-black text-gray-950">
                {index + 1}. {scenario.scenario}
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {([
                  ["ai", "AI"],
                  ["not-ai", "Not AI"],
                ] as const).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={selected === value}
                    onClick={() =>
                      setAnswers((current) => ({
                        ...current,
                        [scenario.id]: value,
                      }))
                    }
                    className={`rounded-full border-2 px-4 py-2 text-sm font-black transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00ffd7] ${
                      selected === value
                        ? "border-gray-950 bg-gray-950 text-white"
                        : "border-gray-400 bg-white text-gray-900 hover:border-gray-950"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {selected ? (
                <div
                  role="status"
                  className={`mt-4 rounded-xl border p-3 text-sm leading-6 ${
                    answeredCorrectly
                      ? "border-emerald-300 bg-emerald-50 text-emerald-950"
                      : "border-amber-300 bg-amber-50 text-amber-950"
                  }`}
                >
                  <strong>{answeredCorrectly ? "Correct." : `The answer is ${scenario.answer === "ai" ? "AI" : "not AI"}.`}</strong>{" "}
                  {scenario.explanation}
                </div>
              ) : null}
            </fieldset>
          );
        })}
      </div>

      {completed === SCENARIOS.length ? (
        <div className="mt-6 flex flex-col gap-3 rounded-2xl bg-gray-950 p-5 text-white sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0 text-sm leading-6">
            <strong>Your score: {score}/{SCENARIOS.length}.</strong>{" "}
            The useful question is not “does it feel clever?” but “what produces
            the output: a fixed instruction, model inference, or both?”
          </p>
          <button
            type="button"
            onClick={() => setAnswers({})}
            className="shrink-0 rounded-full bg-[#00ffd7] px-4 py-2 text-sm font-black text-gray-950 hover:bg-white focus:outline-none focus-visible:ring-4 focus-visible:ring-[#fefc22]"
          >
            Try again
          </button>
        </div>
      ) : null}

      <p className="mt-5 text-xs leading-5 text-gray-600">
        Method note: MLAI constructed these scenarios for explanation. This is
        not a validated assessment and it does not inspect the implementation of
        any named product.
      </p>
    </section>
  );
}
