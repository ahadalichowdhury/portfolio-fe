"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your server
    console.log("Form submitted:", formState);
    // Reset form after submission
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <div className="w-2/4 min-h-screen flex flex-col justify-center items-center text-green-400 p-4">
      <div className="w-full max-w-full">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
          Contact Me
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 animate-fade-in animation-delay-200"
        >
          <div>
            <label htmlFor="name" className="block mb-2 text-lg">
              Name
            </label>
            <Input
              id="name"
              value={formState.name}
              onChange={(e) =>
                setFormState({ ...formState, name: e.target.value })
              }
              placeholder="Your name"
              className="bg-gray-800/50 text-green-400 placeholder-green-400/50 border-green-500/20"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-lg">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={formState.email}
              onChange={(e) =>
                setFormState({ ...formState, email: e.target.value })
              }
              placeholder="Your email"
              className="bg-gray-800/50 text-green-400 placeholder-green-400/50 border-green-500/20"
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-2 text-lg">
              Message
            </label>
            <Textarea
              id="message"
              value={formState.message}
              onChange={(e) =>
                setFormState({ ...formState, message: e.target.value })
              }
              placeholder="Your message"
              rows={5}
              className="bg-gray-800/50 text-green-400 placeholder-green-400/50 border-green-500/20"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-green-500 text-black hover:bg-green-400"
          >
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
}
