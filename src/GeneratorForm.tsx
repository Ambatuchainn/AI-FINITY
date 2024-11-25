import React, { useState } from 'react';

interface GeneratorFormProps {
  onGenerate: (description: string, style: string) => void;
}

const GeneratorForm: React.FC<GeneratorFormProps> = ({ onGenerate }) => {
  const [description, setDescription] = useState<string>('');
  const [style] = useState<string>('Digital Art'); // Default to 'Digital Art'

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onGenerate(description, style);
  };

  return (
    <div className="generator-container">
      <h2 className="form-title">Describe Your Ideas and Generate</h2>
      <p className="form-description">
        Transform your words into visual masterpieces: Leverage AI technology to craft breathtaking NFTs.
      </p>

      <form className="generator-form" onSubmit={handleSubmit}>
        {/* Input field for description */}
        <input
          type="text"
          placeholder="Describe your image..."
          value={description}
          onChange={(e) => setDescription(e.target.value)} // Updates description as the user types
          className="form-input"
        />
        <button type="submit" className="submit-button">Generate</button>
      </form>
    </div>
  );
};

export default GeneratorForm;
