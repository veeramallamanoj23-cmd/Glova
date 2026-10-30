import React, { useState } from 'react';
import { Review } from '../types';
import { Star, MessageSquarePlus, CheckCircle, ChevronLeft, ChevronRight, Sparkles, X } from 'lucide-react';
import { addReview } from '../services/db';

interface TestimonialsSectionProps {
  reviews: Review[];
  onReviewAdded: (newReview: Review) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ reviews, onReviewAdded }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your name');
      return;
    }
    if (!serviceName.trim()) {
      setErrorMsg('Please mention the service you experienced');
      return;
    }
    if (!reviewText.trim() || reviewText.length < 10) {
      setErrorMsg('Please provide a short review (at least 10 characters)');
      return;
    }

    setSubmitting(true);
    try {
      const saved = await addReview({
        customerName: name.trim(),
        serviceName: serviceName.trim(),
        rating,
        reviewText: reviewText.trim()
      });
      onReviewAdded(saved);
      setSuccessMsg(true);
      setTimeout(() => {
        setSuccessMsg(false);
        setModalOpen(false);
        setName('');
        setServiceName('');
        setReviewText('');
        setRating(5);
      }, 1500);
    } catch (err: any) {
      setErrorMsg('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold uppercase tracking-widest mb-4">
            <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
            <span>Client Praise & Stories</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-luxe-ivory mb-2">
            Loved by the Discerning.
          </h2>
          <p className="text-sm text-luxe-muted max-w-xl">
            Hear from our community of gentlemen, brides, executives, and creative tastemakers who trust GLOVA for their signature looks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-2.5 rounded-full border border-gold-500/40 text-gold-300 hover:text-black hover:bg-gold-500 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>

          {/* Carousel arrows */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={prevReview}
              className="p-3 rounded-full border border-white/10 hover:border-gold-400 text-white hover:text-gold-400 transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextReview}
              className="p-3 rounded-full border border-white/10 hover:border-gold-400 text-white hover:text-gold-400 transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Featured Testimonial Banner / Slider */}
      {reviews.length > 0 && (
        <div className="relative rounded-3xl mobbin-card p-8 sm:p-12 mb-12">
          <div className="max-w-4xl mx-auto">
            {/* Stars */}
            <div className="flex items-center gap-1.5 mb-6">
              {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-gold-400 text-gold-400" />
              ))}
            </div>

            {/* Review quote */}
            <blockquote className="font-serif text-xl sm:text-2xl text-luxe-ivory leading-relaxed mb-8 italic">
              "{reviews[currentIndex].reviewText}"
            </blockquote>

            {/* Author details */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-gold-500/15">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-serif text-base font-bold text-gold-300">
                    {reviews[currentIndex].customerName}
                  </h4>
                  {reviews[currentIndex].verified && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-400 text-[10px] font-semibold">
                      <CheckCircle className="w-3 h-3" />
                      Verified Visit
                    </span>
                  )}
                </div>
                <p className="text-xs text-luxe-muted mt-0.5">
                  Treatment: {reviews[currentIndex].serviceName} &bull; {reviews[currentIndex].date}
                </p>
              </div>

              {/* Indicator dots */}
              <div className="flex items-center gap-2">
                {reviews.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? 'w-8 bg-gold-400' : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Jump to review ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Write Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-luxe-card border border-gold-500/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl animate-fade-in">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-luxe-muted hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-widest text-gold-400 font-bold block mb-1">
                Your Feedback Matters
              </span>
              <h3 className="font-serif text-2xl font-bold text-luxe-ivory">
                Share Your GLOVA Experience
              </h3>
            </div>

            {successMsg ? (
              <div className="py-8 text-center">
                <CheckCircle className="w-12 h-12 text-gold-400 mx-auto mb-3 animate-bounce" />
                <h4 className="font-serif text-lg font-bold text-luxe-ivory">Thank You!</h4>
                <p className="text-xs text-luxe-muted mt-1">Your review has been verified and posted.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-luxe-muted block mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Shalini Roy"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-gold-500/20 text-white text-xs focus:outline-none focus:border-gold-400"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-luxe-muted block mb-1">
                    Service Experienced
                  </label>
                  <input
                    type="text"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    placeholder="e.g. Balayage, Fade Cut, Gold Facial"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-gold-500/20 text-white text-xs focus:outline-none focus:border-gold-400"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-luxe-muted block mb-1">
                    Your Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating
                              ? 'fill-gold-400 text-gold-400'
                              : 'text-luxe-muted'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs text-gold-300 font-semibold ml-2">
                      {rating} of 5 Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-luxe-muted block mb-1">
                    Your Review
                  </label>
                  <textarea
                    rows={4}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Describe your salon experience, stylist care, and result..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-gold-500/20 text-white text-xs focus:outline-none focus:border-gold-400"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="gold-glow-btn w-full py-3 rounded-xl text-xs font-bold uppercase tracking-widest mt-2"
                >
                  {submitting ? 'Submitting...' : 'Post Review'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
