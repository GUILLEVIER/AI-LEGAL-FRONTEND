import LoadingLogo from './../assets/logos/LoadingLogo.svg?url'

const LoadingModal = () => {
  return (
    <div className='loading-modal'>
      <div className='loading-modal-logo'>
        <figure>
          <img className='rotation-zoom' src={LoadingLogo} alt='logo-loading' />
        </figure>
      </div>
    </div>
  )
}

export default LoadingModal
