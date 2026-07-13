'use server';

export async function submitContactForm(formData: FormData) {
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const level = formData.get('level') as string;
  const goal = formData.get('goal') as string;

  if (!name || !phone || !level || !goal) {
    return { error: 'All fields are required.' };
  }

  try {
    // Mock submission for now since Directus is removed
    console.log('Contact form submitted:', { name, phone, level, goal });
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  } catch (error) {
    console.error('Contact form submission error:', error);
    return { error: 'Failed to submit form.' };
  }
}
