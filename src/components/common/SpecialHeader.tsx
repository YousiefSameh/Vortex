const SpecialHeader = ({ title }: { title: string }) => {
  return (
    <div className="w-full text-center mb-8">
      <h2 className="text-5xl font-bold bg-gradient-to-b from-[#6A198A] to-white inline-block text-transparent bg-clip-text border-b border-b-white pb-4">
        {title}
      </h2>
    </div>
  );
}

export default SpecialHeader;