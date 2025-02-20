
import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Star } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function RatingsSection() {
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [ratings, setRatings] = useState<any[]>([]);
  const [average, setAverage] = useState<number>(0);

  const fetchRatings = async () => {
    const response = await fetch('/api/ratings');
    const data = await response.json();
    setRatings(data.ratings);
    setAverage(data.average);
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

  const chartData = {
    labels: ratings.map((_, i) => `Rating ${i + 1}`),
    datasets: [
      {
        label: 'Ratings',
        data: ratings.map(r => r.rating),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

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
          <div className="h-[200px]">
            <Line data={chartData} options={{ maintainAspectRatio: false }} />
          </div>
        </Card>
      </div>
    </section>
  );
}
