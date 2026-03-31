import logoSrc from '../../kahf-logo.png'

export default function Logo({ className = '', size = 48, invert = false, opacity = 1 }) {
  return (
    <img
      src={logoSrc}
      alt="KAHF"
      width={size}
      height={size}
      className={`object-contain select-none ${invert ? 'invert' : ''} ${className}`}
      style={{
        opacity,
        filter: invert ? 'invert(1)' : undefined,
        mixBlendMode: invert ? 'normal' : 'multiply',
      }}
    />
  )
}
