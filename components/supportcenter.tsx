import { useState } from 'react';
import { toast } from 'react-hot-toast'; // For toast notifications
import { useRouter } from 'next/navigation';
import styles from '@/app/(dashboard)/(routes)/help/supportcenter.module.css'; // Add CSS module for scoped styling

type SupportQueryForm = {
  email: string;
  subject: string;
  message: string;
};

const SupportCenter = () => {
  const [form, setForm] = useState<SupportQueryForm>({
    email: '',
    subject: '',
    message: '',
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        toast.success('Your query has been sent!');
        setForm({ email: '', subject: '', message: '' });
      } else {
        toast.error('Failed to send query');
      }
    } catch (error) {
      console.error('Error submitting query:', error);
      toast.error('An error occurred');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.supportCenter}>
        <h1 className={styles.title}>Support Center</h1>

        {/* FAQ Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <div className={styles.faq}>
            <details>
              <summary>How can I reset my password?</summary>
              <p>To reset your password, click on the 'Forgot Password' link on the login page.</p>
            </details>
            <details>
              <summary>Where can I see my course progress?</summary>
              <p>Your course progress is displayed in the course sidebar or in the user dashboard.</p>
            </details>
          </div>
        </section>

        {/* Query Form */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Send a Support Query</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email:</label>
              <input
                id="email"
                className={styles.input}
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Your email address"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subject" className={styles.label}>Subject:</label>
              <input
                id="subject"
                className={styles.input}
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                placeholder="Query subject"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>Message:</label>
              <textarea
                id="message"
                className={styles.textarea}
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                placeholder="Your query"
              ></textarea>
            </div>

            <button type="submit" className={styles.submitButton}>Send Message</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default SupportCenter;
