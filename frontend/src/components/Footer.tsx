const Footer = () => {
  return (
    <footer className="bg-blue-800 py-10">
      <div className="container mx-auto flex items-center justify-between">
        <span className="text-3xl font-bold tracking-tight text-white">
          HotelBookings.com
        </span>
        <span className="flex gap-4 text-xl font-bold tracking-tight text-white">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Service</p>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
