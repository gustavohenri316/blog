import { CloudRain } from "lucide-react";

const features = [
  {
    name: "Cadastre-se gratuitamente",
    description:
      "Comece sem custos. Registre-se em segundos e desbloqueie um mundo de possibilidades sem compromisso.",
    icon: CloudRain,
  },
  {
    name: "Desempenho ultrarrápido",
    description:
      "Experimente velocidades relâmpago. Nossa plataforma garante que seu blog carregue rapidamente, mantendo seus leitores engajados.",
    icon: CloudRain,
  },
  {
    name: "Super seguro com Kinde",
    description:
      "Sua segurança é nossa prioridade. Com o Kinde, protegemos seus dados com sistemas de criptografia e autenticação de última geração.",
    icon: CloudRain,
  },
  {
    name: "Fácil de usar",
    description:
      "Criar seu blog nunca foi tão fácil. Nossa interface intuitiva permite que você configure e gerencie seu blog com o mínimo de esforço.",
    icon: CloudRain,
  },
];

export function Features() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-2xl lg:text-center">
        <p className="font-semibold leading-7 text-primary">Blog Mais Rápido</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Coloque seu blog no ar em minutos
        </h1>
        <p className="mt-6 text-base leading-snug text-muted-foreground">
          Comece seu blog sem esforço com nossa plataforma simples e eficiente.
          Com apenas alguns cliques, seu blog estará no ar e pronto para ser compartilhado com o mundo.
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
