import React from 'react';

const ConfirmationModal = () => {
	return (
		<div id='assignmentModal' className='assignmentModal'>
			<div className='modal-content'>
				<div className='modal-header'>
					<span className='modal-close-assig'>&times;</span>
					<h2>Atribuirea testelor pentru utilizatori</h2>
				</div>
				<div className='modal-body'>
					<form onSubmit={onSubmit}>
						<div className='grid-2'>
							<div>
								<ModalUsers users={users_list} onChange={onChangeUsers} selected={selectedUser} />
							</div>
							<div>
								<ModalTests tests={tests} onChange={onChangeTests} selected={selectedTests} />
							</div>
						</div>
						<div className='grid-2'>
							<div>
								<input
									type='button'
									value={'Revoca testele'}
									className='btn btn-primary btn-block'
									style={{ font: 'inherit' }}
									onClick={onClickRevoke}
								/>
							</div>
							<div>
								<input type='submit' value={'Atribuie testele'} className='btn btn-primary btn-block' />
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationModal;
