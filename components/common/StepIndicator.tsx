interface StepIndicatorProps {
    current: number;
    total: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ current, total }) => {
    return (
        <div className="flex items-center justify-center gap-3">
            {Array.from({ length: total }, (_, i) => i + 1).map((step) => (
                <div key={step} className="flex items-center gap-3">
                <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    step < current
                        ? "bg-purple-600 text-white"           // completed
                        : step === current
                        ? "bg-purple-600 text-white ring-4 ring-purple-200" // active
                        : "bg-gray-200 text-gray-500"           // upcoming
                    }`}
                >
                    {step < current ? "✓" : step}
                </div>
                {step < total && (
                    <div
                    className={`w-12 h-0.5 transition-colors ${
                        step < current ? "bg-purple-600" : "bg-gray-200"
                    }`}
                    />
                )}
                </div>
            ))}
        </div>
    )
}