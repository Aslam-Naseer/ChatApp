import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useReadMessages = () => {
  return useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*,sender(email)")
        .order("created_at", { ascending: true })
        .limit(50);

      if (error) {
        throw error;
      }

      return data;
    },
  });
};

export const useCreateMessage = () => {
  const { session } = useAuth();

  return useMutation({
    mutationFn: async (message: string) => {
      const { error, data } = await supabase.from("messages").insert({
        msg: message,
        sender: session?.user.id,
      });

      if (error) {
        throw error;
      }
    },

    onError(error) {
      console.log(error);
    },
  });
};

export const useMessageSubscription = () => {
  const queryClient = useQueryClient();

  return useEffect(() => {
    const messages = supabase
      .channel("msg-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        async (payload) => {
          await queryClient.invalidateQueries({ queryKey: ["messages"] });
        }
      )
      .subscribe();
    return () => {
      messages.unsubscribe();
    };
  }, []);
};
