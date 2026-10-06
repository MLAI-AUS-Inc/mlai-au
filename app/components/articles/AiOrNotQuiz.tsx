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
      "The calculator follows set maths rules. It doesn't need to learn patterns or work out what you mean.",
  },
  {
    id: "spam-filter",
    scenario: "An email service spots spam by learning from earlier messages.",
    answer: "ai",
    explanation:
      "It uses patterns from earlier messages to judge a new one. An ordinary rule can then move suspected spam to a separate folder.",
  },
  {
    id: "scheduled-light",
    scenario: "A light switches on at 7 pm because a timer was set for 7 pm.",
    answer: "not-ai",
    explanation:
      "You set the time, and the light follows that instruction. That's automation; it doesn't need AI.",
  },
  {
    id: "recommendations",
    scenario: "A streaming service suggests a show based on what you've watched.",
    answer: "ai",
    explanation:
      "In this example, a model uses viewing patterns to predict what you might enjoy. Different services may make recommendations in different ways.",
  },
  {
    id: "contact-form",
    scenario: "A contact form sends the same confirmation email after every submission.",
    answer: "not-ai",
    explanation:
      "Someone wrote the email in advance. The form sends that same message each time, so there's no AI involved in this step.",
  },
  {
    id: "speech",
    scenario: "A phone turns speech into text using examples of recordings and their written words.",
    answer: "ai",
    explanation:
      "The model works out which words match the sounds. Background noise, accents and unfamiliar names can still trip it up.",
  },
  {
    id: "overtime-rule",
    scenario: "Payroll adds overtime pay whenever hours worked go above a set limit.",
    answer: "not-ai",
    explanation:
      "This step follows a set rule about hours and pay. Other parts of the software might use AI, but this calculation doesn't need it.",
  },
  {
    id: "drafting",
    scenario: "A writing tool creates a new product description from your instructions.",
    answer: "ai",
    explanation:
      "The tool uses generative AI to write a description. Check the details: it might add a feature the product doesn't have.",
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
            Try it yourself
          </p>
          <h2 id="ai-or-not-heading" className="mt-2 text-3xl font-black tracking-tight text-gray-950">
            AI or ordinary software?
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-700">
            Choose AI or Not AI, then see why. You can also open all the
            answers below. Some apps mix AI with ordinary rules; focus on
            what each example describes.
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
            Look for what the software is doing: following a fixed instruction,
            working out an answer with a model, or a bit of both.
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

      <details className="mt-6 rounded-2xl border border-gray-300 p-4">
        <summary className="cursor-pointer font-bold text-gray-950">Read all answers and explanations</summary>
        <ol className="mt-4 space-y-4 text-sm leading-6 text-gray-800">
          {SCENARIOS.map((scenario, index) => <li key={scenario.id}>
            <strong>{index + 1}. {scenario.scenario} {scenario.answer === "ai" ? "AI." : "Not AI."}</strong>{" "}
            {scenario.explanation}
          </li>)}
        </ol>
      </details>
      <p className="mt-5 text-xs leading-5 text-gray-600">
        These made-up examples are for practice. Your score isn't a qualification
        or a test of any particular app.
      </p>
    </section>
  );
}
