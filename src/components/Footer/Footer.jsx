import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>
        Toilet data from{' '}
        <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">
          OpenStreetMap
        </a>{' '}
        contributors, via the Overpass API.
      </p>
    </footer>
  );
}

export default Footer;
