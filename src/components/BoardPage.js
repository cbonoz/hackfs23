import { Button, Card, Col, Modal, Row, Spin } from 'antd';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getMetadata, getRedirectUrl, getTitle, refer } from '../contract/linkContract';
import { getRpcError, isEmpty } from '../util';
import { APP_NAME } from '../util/constants';
import CsvDownloadButton from 'react-json-to-csv'

import { sendPush } from '../util/notifications';
import { About } from './About';

// This page should page a contractAddress path parameter enable a web3 transaction to credit a user with a link referral, 
// and then redirect to url stored in state
export default function BoardPage({ activeChain, account, provider }) {
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = useState()
    const [data, setData] = useState({})
    const [showAbout, setShowAbout] = useState(false)
    const [success, setSuccess] = useState(false)

    const { boardId } = useParams();

    async function createTicket() {

    }

    async function load() {
        if (!boardId || !account) {
            return
        }
        setLoading(true)
        try {
            const res = await getMetadata(boardId)
            // Unpack the response
            setData({
                boardName: res[0],
                companyName: res[1],
                logo: res[2],
            })
        } catch (e) {
            console.log(e)
            let message = getRpcError(e)
            if (message.indexOf('call revert') !== -1) {
                message = 'You may be connected to the wrong network. Please check selected network and metamask and try again.'
            }

            setError('Error reading link data: ' + message)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (account) {
            setError(undefined)
            load()
        } else {
            setError('Please connect your wallet to continue.')
        }
    }, [provider, account])

    if (loading) {
        return <div>
            <Spin size="large" />
        </div>
    }

    const openAbout = () => {
        setShowAbout(true)
    }

    const { tickets, board } = data

    const hasTickets = !isEmpty(tickets);

    return (
        <div>
            {JSON.stringify(data)}

            {error && <div>
                <span className='error-text'>{error}</span></div>}

            <Row>
                <Col span={12}>
                    {/* Create new ticket */}
                    <Card className="create-form white boxed" title={`Create a new ${APP_NAME} ticket`}>
                        <form onSubmit={createTicket}>
                            <h1>Create ticket</h1>

                            


                        </form>

                    </Card>
                </Col>
                <Col span={12}>
                    {hasTickets && <div>
                        {/* Existing tickets */}
                        {tickets.map((ticket, i) => {
                            return <Card key={i} className="ticket white boxed" title={`Ticket ${i + 1}`}>
                                <h1>{ticket.title}</h1>
                                <p>{ticket.description}</p>
                                <p>Created by: {ticket.creator}</p>
                                <p>Created at: {new Date(ticket.createdAt).toLocaleString()}</p>
                                <p>Expires at: {new Date(ticket.expiresAt).toLocaleString()}</p>
                            </Card>
                        })}
                        <CsvDownloadButton data={tickets} />
                    </div>}
                    {!hasTickets && <div>
                        <p>
                            No feature tickets yet. Create one now!
                        </p></div>}

                </Col>
            </Row>
            {/* <Modal
                title={<span className='success-text'>Referral successful</span>}
                open={success}
                okButtonProps={{ style: { display: 'none' } }}
                cancelButtonProps={{ style: { display: 'none' } }}
                onCancel={() => setSuccess(false)}>
                <hr />
                <h3>Proceed to page below</h3>
                <a href={fullRedirectUrl} rel="noreferrer">{fullRedirectUrl}</a>
                <br />
                <br />
                <p>Thanks for using {APP_NAME}!</p>
            </Modal> */}
        </div>
    )
}
