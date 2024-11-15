import Footer from "../components/Footer";
import Header from "../components/Header";
import ScratchCodeVerifier from "../components/ScratchCodeVerifier"; // Import Scratch Code Verifier

export default function Layout({ children }) {
  return (
    <div className="layout-wrapper">
      <Header />
      <div className="content-wrapper">{children}</div>

      {/* Scratch Code Verifier Component */}
      <ScratchCodeVerifier apiUrl="/api/scratch-code" />

      <Footer />
    </div>
  );
}
