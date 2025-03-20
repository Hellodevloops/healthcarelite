"use client";

import React from "react";
import { Code } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-background py-4 px-6 mt-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Code className="h-5 w-5 text-primary" />
          <span>
            Built by{" "}
            <a
              href="https://devloops.io"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              Devloops Technologies
            </a>
          </span>
        </div>
        <div className="text-center">
          © {new Date().getFullYear()} Healthcare Lite. All rights reserved.
        </div>
        <div>
          <span className="font-medium">Version:</span> v1.0
        </div>
      </div>
    </footer>

  );
}