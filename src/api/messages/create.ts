import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useReadMessages = () => {
  return useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*,sender(email)")
        .limit(50);

      console.log("in create" + data);

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
