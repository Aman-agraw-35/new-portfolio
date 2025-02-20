import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface Rating {
  rating: number;
  createdAt: string;
  _id: string;
}

interface RatingsResponse {
  ratings: Rating[];
  averageRating: number;
}

export function RatingSection() {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { data: ratingsData } = useQuery<RatingsResponse>({
    queryKey: ['/api/ratings'],
    staleTime: 1000 * 60, // 1 minute
  });

  const submitRating = useMutation({
    mutationFn: async (rating: number) => {
      await apiRequest('POST', '/api/ratings', { rating });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/ratings'] });
    },
  });

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          Rate My Portfolio
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Rating Input */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Leave a Rating</h3>
                <div className="flex gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Button
                      key={rating}
                      variant={selectedRating === rating ? "default" : "outline"}
                      size="icon"
                      onClick={() => setSelectedRating(rating)}
                    >
                      <Star
                        className={selectedRating! >= rating ? "fill-current" : ""}
                      />
                    </Button>
                  ))}
                </div>
                <Button
                  className="w-full"
                  onClick={() => {
                    if (selectedRating) {
                      submitRating.mutate(selectedRating);
                      setSelectedRating(null);
                    }
                  }}
                  disabled={!selectedRating || submitRating.isPending}
                >
                  Submit Rating
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Rating Display */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Rating Statistics</h3>
                {ratingsData ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-4xl font-bold text-primary">
                        {ratingsData.averageRating.toFixed(1)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Average Rating
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                      Based on {ratingsData.ratings.length} ratings
                    </p>
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground">
                    No ratings yet
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}