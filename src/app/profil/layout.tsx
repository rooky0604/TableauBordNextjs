import Container from "@/components/container";
import { TopNav } from "@/components/nav";

export default function ProfilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNav title="Mon profil" />
      <main>
        <Container>{children}</Container>
      </main>
    </>
  );
}
