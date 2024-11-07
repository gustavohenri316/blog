import { CloudRain } from "lucide-react";

const features = [
  {
    name: "Sign up for free",
    description:
      "Get started without any costs. Register in seconds and unlock a world of possibilities with no commitment required.",
    icon: CloudRain,
  },
  {
    name: "Blazing fast performance",
    description:
      "Experience lightning-fast speeds. Our platform ensures that your blog loads quickly, keeping your readers engaged.",
    icon: CloudRain,
  },
  {
    name: "Super secure with Kinde",
    description:
      "Your security is our priority. With Kinde, we protect your data with state-of-the-art encryption and authentication systems.",
    icon: CloudRain,
  },
  {
    name: "Easy to use",
    description:
      "Building your blog has never been easier. Our intuitive interface allows you to set up and manage your blog with minimal effort.",
    icon: CloudRain,
  },
];

export function Features() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-2xl lg:text-center">
        <p className="font-semibold leading-7 text-primary">Blog Faster</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Get your blog up and running in minutes
        </h1>
        <p className="mt-6 text-base leading-snug text-muted-foreground">
          Start your blog effortlessly with our simple and efficient platform.
          With just a few clicks, you'll have your blog live and ready to share
          with the world.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <div className="text-base font-semibold leading-7">
                <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-primary">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                {feature.name}
              </div>
              <p className="mt-2 text-sm leading-snug text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
