import { useEffect, useMemo, useRef, useState } from 'react';
import { Simulate } from 'react-dom/test-utils';
import input = Simulate.input;

enum Step {
  COLLECTING = 'collecting',
  CALCULATING = 'calculating',
  RESULT = 'result',
  ERROR = 'error',
}

enum SalaryTier {
  SMALL = 'salary-0',
  MEDIUM = 'salary-1',
  LARGE = 'salary-2',
}

const HOURLY_MAP: Record<SalaryTier, number> = {
  [SalaryTier.SMALL]: 35,
  [SalaryTier.MEDIUM]: 50,
  [SalaryTier.LARGE]: 70,
};
const WEEKS = 52;

const CollectingStep = ({
  employeeCount,
  setEmployeeCount,
  meetingHours,
  setMeetingHours,
  salaryTier,
  setSalaryTier,
  setStep,
}: {
  employeeCount: number;
  setEmployeeCount: (value: number) => void;
  meetingHours: number;
  setMeetingHours: (value: number) => void;
  salaryTier: SalaryTier;
  setSalaryTier: (value: SalaryTier) => void;
  setStep: (value: Step) => void;
}) => {
  return (
    <form
      className="flex flex-col gap-6"
      id="roi-calculator"
      data-step="1"
      data-hs-cf-bound="true"
    >
      <div className="">
        <label className="font-semibold" htmlFor="number-of-employees">
          Number of Employees
          <span className="text-[#6B7280]">(at your company)</span>
        </label>
        <input
          type="range"
          min="2"
          max="500"
          step="1"
          value={employeeCount}
          onChange={(e) => {
            setEmployeeCount(parseInt(e.target.value));
          }}
          id="number-of-employees"
          className="mt-4 w-full text-blue-500"
        />
        <div className="flex w-full justify-between text-sm">
          <div id="number-of-employees-value" className="font-bold">
            70
          </div>
          <div className="text-xs">500+</div>
        </div>
      </div>
      <div className="">
        <label className="font-semibold" htmlFor="hours-in-meetings">
          Hours spent in meetings per week
          <span className="text-[#6B7280]">(avg. per employee)</span>
        </label>
        <input
          type="range"
          min="1"
          max="40"
          step="1"
          value={meetingHours}
          onChange={(e) => {
            setMeetingHours(parseInt(e.target.value));
          }}
          id="hours-in-meetings"
          className="mt-4 w-full"
        />
        <div className="flex w-full justify-between text-sm">
          <div id="hours-in-meetings-value" className="font-bold">
            4
          </div>
          <div className="text-xs">40+</div>
        </div>
      </div>
      <div>
        <label className="font-semibold" htmlFor="number-of-employees">
          Average salary per employee
        </label>
      </div>
      <div className="flex text-xs md:text-sm">
        <div>
          <input
            className="peer sr-only"
            type="checkbox"
            id="salary-radio-0"
            value="salary-0"
            aria-labelledby="salary-radio-0-label"
            checked={salaryTier === SalaryTier.SMALL}
            onChange={() => {
              setSalaryTier(SalaryTier.SMALL);
            }}
          />
          <label
            htmlFor="salary-radio-0"
            className="salary-checkbox mr-2 cursor-pointer rounded-lg border py-2 px-3 font-bold focus:outline-none peer-checked:border-[#3b368f] peer-checked:bg-[#E0E7FF]"
          >
            $40 - $70k
          </label>
        </div>
        <div>
          <input
            className="peer sr-only"
            type="checkbox"
            id="salary-radio-1"
            value="salary-1"
            aria-labelledby="salary-radio-1-label"
            checked={salaryTier === SalaryTier.MEDIUM}
            onChange={() => {
              setSalaryTier(SalaryTier.MEDIUM);
            }}
          />
          <label
            htmlFor="salary-radio-1"
            className="salary-checkbox mr-2 cursor-pointer rounded-lg border py-2 px-3 font-bold focus:outline-none peer-checked:border-[#3b368f] peer-checked:bg-[#E0E7FF]"
          >
            $80k - $100k
          </label>
        </div>
        <div>
          <input
            className="peer sr-only"
            type="checkbox"
            id="salary-radio-2"
            value="salary-2"
            aria-labelledby="salary-radio-2-label"
            checked={salaryTier === SalaryTier.LARGE}
            onChange={() => {
              setSalaryTier(SalaryTier.LARGE);
            }}
          />
          <label
            htmlFor="salary-radio-2"
            className="salary-checkbox mr-2 cursor-pointer rounded-lg border py-2 px-3 font-bold focus:outline-none peer-checked:border-[#3b368f] peer-checked:bg-[#E0E7FF]"
          >
            $100k +
          </label>
        </div>
      </div>

      <div className="mt-4 border-t pt-4">
        <button
          onClick={() => setStep(Step.CALCULATING)}
          className="rounded-lg py-2 px-4 font-bold text-white"
          style={{ backgroundColor: '#3b368f' }}
        >
          Calculate Savings
        </button>
      </div>
    </form>
  );
};

const CalculatingStep = ({ setStep }: { setStep: (value: Step) => void }) => {
  useEffect(() => {
    setTimeout(() => {
      setStep(Step.RESULT);
    }, 500);
  }, []);

  return (
    <div data-step="2">
      <div className="flex h-[250px] items-center justify-center">
        <svg
          role="status"
          className="h-10 w-10 animate-spin fill-[#4F46E5] text-gray-200"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          ></path>
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          ></path>
        </svg>
      </div>
      <div className="mt-4 border-t pt-4">
        <button
          disabled
          type="submit"
          className="rounded-lg bg-[#4F46E5] py-2 px-4 font-bold text-white disabled:opacity-60"
        >
          Calculate Savings
        </button>
      </div>
    </div>
  );
};

const ResultStep = ({ formattedTotal }: { formattedTotal: string }) => {
  return (
    <div data-step="3">
      <div className="flex h-[250px] flex-col items-start justify-center">
        <div className="mb-6 text-2xl font-semibold">
          You can save an average of{' '}
          <span id="calculator-result" className="text-[#3730A3]">
            {formattedTotal}
          </span>
          per year using <span className="text-[#3730A3]">Reelay</span>
        </div>
        <p>
          Signup below and we'll schedule time to tell you exactly how we can
          help change the way you do meetings.
        </p>
      </div>
    </div>
  );
};

function App() {
  const [step, setStep] = useState<Step>(Step.COLLECTING);

  const [employeeCount, setEmployeeCount] = useState(70);
  const [meetingHours, setMeetingHours] = useState(4);
  const [salaryTier, setSalaryTier] = useState<SalaryTier>(SalaryTier.SMALL);

  const formattedTotal = useMemo(() => {
    const paidUsers = employeeCount * 0.3;
    const hourlyBySalary = HOURLY_MAP[salaryTier];
    const totalMeetingCostPerWeek =
      meetingHours * hourlyBySalary * employeeCount;
    const totalAnualCost = totalMeetingCostPerWeek * WEEKS;
    const meetingCost = totalAnualCost * 0.5;
    const reelayCost = paidUsers * 120;
    const setupFee = paidUsers * 1200;
    const total = meetingCost - reelayCost - setupFee;

    return Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(total);
  }, [employeeCount, meetingHours, salaryTier]);

  return (
    <div className="w-full p-6 text-left">
      <div className="w-full max-w-[742px] rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-[24px] flex items-center border-b pb-[32px] text-2xl font-bold">
          <div id="reset-calc-button-wrapper" className="mr-4 hidden">
            <button id="reset-calc-button">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 8.99875H3.83L8.71 13.8787C9.1 14.2688 9.1 14.9087 8.71 15.2987C8.32 15.6888 7.69 15.6888 7.3 15.2987L0.71 8.70875C0.32 8.31875 0.32 7.68875 0.71 7.29875L7.29 0.69875C7.68 0.30875 8.31 0.30875 8.7 0.69875C9.09 1.08875 9.09 1.71875 8.7 2.10875L3.83 6.99875H15C15.55 6.99875 16 7.44875 16 7.99875C16 8.54875 15.55 8.99875 15 8.99875Z"
                  fill="#111827"
                ></path>
              </svg>
            </button>
          </div>
          Savings Calculator
        </div>
        {step === Step.COLLECTING && (
          <CollectingStep
            employeeCount={employeeCount}
            setEmployeeCount={setEmployeeCount}
            meetingHours={meetingHours}
            setMeetingHours={setMeetingHours}
            salaryTier={salaryTier}
            setSalaryTier={setSalaryTier}
            setStep={setStep}
          />
        )}
        {step === Step.CALCULATING && <CalculatingStep setStep={setStep} />}
        {step === Step.RESULT && <ResultStep formattedTotal={formattedTotal} />}
      </div>
    </div>
  );
}

export default App;
