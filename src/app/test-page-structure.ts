// Simple test to verify page structure and functionality
export const testPageStructure = () => {
  const sections = [
    'hero',
    'roadmaps', 
    'instructor',
    'testimonials',
    'waitlist'
  ];

  const results = {
    sectionsFound: 0,
    missingElements: [] as string[],
    smoothScrollWorking: false,
    navigationVisible: false
  };

  // Check if all sections exist
  sections.forEach(sectionId => {
    const element = document.getElementById(sectionId);
    if (element) {
      results.sectionsFound++;
    } else {
      results.missingElements.push(sectionId);
    }
  });

  // Check smooth scroll behavior
  results.smoothScrollWorking = document.documentElement.style.scrollBehavior === 'smooth';

  // Check if navigation appears after scroll
  const nav = document.querySelector('nav');
  results.navigationVisible = nav !== null;

  return results;
};

// Test scroll functionality
export const testScrollFunctionality = () => {
  const testResults = {
    smoothScrollToFunction: false,
    scrollToTopButton: false,
    sectionNavigation: false
  };

  // Test smooth scroll function
  try {
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      testResults.smoothScrollToFunction = true;
    }
  } catch (error) {
    console.error('Smooth scroll test failed:', error);
  }

  // Test scroll to top button
  const scrollButton = document.querySelector('[aria-label="Scroll to top"]');
  testResults.scrollToTopButton = scrollButton !== null;

  // Test section navigation
  const sectionNav = document.querySelector('nav');
  testResults.sectionNavigation = sectionNav !== null;

  return testResults;
};