import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Star } from 'lucide-react';

export function RatingsSection() {
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [ratings, setRatings] = useState<any[]>([]);
  const [average, setAverage] = useState<number>(0);

  const fetchRatings = async () => {
    try {
      const response = await fetch('/api/ratings');
      const data = await response.json();
      setRatings(data.ratings || []);
      setAverage(data.average || 0);
    } catch (error) {
      console.error('Error fetching ratings:', error);
      setRatings([]);
      setAverage(0);
    }
  };

  const submitRating = async () => {
    if (selectedRating === 0) return;
    await fetch('/api/ratings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating: selectedRating }),
    });
    setSelectedRating(0);
    fetchRatings();
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  return (
    <section className="container mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Ratings</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Rate My Portfolio</h3>
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((rating) => (
              <Button
                key={rating}
                variant={selectedRating === rating ? "default" : "outline"}
                onClick={() => setSelectedRating(rating)}
              >
                <Star className={selectedRating >= rating ? "fill-current" : ""} />
              </Button>
            ))}
          </div>
          <Button onClick={submitRating} disabled={selectedRating === 0}>
            Submit Rating
          </Button>
        </Card>
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Rating Statistics</h3>
          <p className="text-2xl font-bold mb-4">Average: {average.toFixed(1)} / 5</p>
          <div className="space-y-2">
            <p className="text-muted-foreground">Recent Ratings:</p>
            <div className="grid gap-2">
              {ratings.slice(-5).map((rating, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-md">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < rating.rating ? "fill-yellow-400" : "fill-muted-foreground"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(rating.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}