import React from "react";
import { Link } from "react-router-dom";
import { Bell, Zap, Shield, Users } from "lucide-react";

export const Home = () => {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center space-y-8 py-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border">
          <Bell className="w-4 h-4 text-foreground" />
          <span className="text-sm font-semibold text-foreground">
            Real-Time Notification System
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
          Stay{" "}
          <span className="text-foreground underline decoration-2 underline-offset-4">
            connected
          </span>{" "}
          with your team
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Enterprise-grade real-time notification system for modern teams.
          Instant delivery, powerful features, and seamless integration.
        </p>

        <div className="flex items-center justify-center gap-4 pt-4">
          <Link
            to="/register"
            className="px-8 py-4 rounded-lg font-semibold text-white bg-black hover:bg-gray-800 transition-all duration-300 shadow-lg"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-8 py-4 rounded-lg font-semibold text-foreground border-2 border-border hover:bg-accent/50 transition-all duration-300"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 rounded-lg bg-black flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Instant Delivery</h3>
          <p className="text-muted-foreground">
            Real-time notifications delivered instantly to your team members.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Enterprise Security</h3>
          <p className="text-muted-foreground">
            Bank-level encryption and security for your sensitive data.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 rounded-lg bg-black flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
          <p className="text-muted-foreground">
            Keep your entire team in sync with collaborative features.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center mb-4">
            <Bell className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Smart Notifications</h3>
          <p className="text-muted-foreground">
            Intelligent routing and prioritization of your notifications.
          </p>
        </div>
      </section>
    </div>
  );
};
