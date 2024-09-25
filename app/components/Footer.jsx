export default function FooterComp() {
  return (
    <footer className="bg-[#ddddd4] py-6">
      <div className="container mx-auto text-center text-black text-xl">
        &copy; {new Date().getFullYear()} Salesi. All rights reserved.
      </div>
    </footer>
  );
}
