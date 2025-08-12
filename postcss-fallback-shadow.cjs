module.exports = () => {
  return {
    postcssPlugin: 'postcss-shadow-fallback',
    Declaration(decl) {
      if (decl.prop === 'box-shadow' && decl.value.includes('var(')) {
        // Simple fallback for common Tailwind shadows
        const fallback = decl.value
          .replace(/var\([^)]+\)/g, 'rgba(0, 0, 0, 0.1)') // Replace var() with static rgba
          .replace(/0 0 #0000/g, 'none'); // Clean up zero shadows

        decl.cloneBefore({ value: fallback });
      }
    }
  };
};
module.exports.postcss = true;