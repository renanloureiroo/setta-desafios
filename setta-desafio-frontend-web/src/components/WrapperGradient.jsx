export const WrapperGradient = ({ children }) => {
  return (
    <div className="h-screen bg-gradient-to-b from-brand-blue to-brand-coral">
      {children}
    </div>
  );
};
